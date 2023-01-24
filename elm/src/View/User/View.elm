module View.User.View exposing (view)

import Html exposing (Html)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Model.Amount exposing (Amount)
import Model.Primary as Primary exposing (Primary)
import Model.User.State exposing (State(..))
import Model.User.User exposing (User)
import Msg.Msg exposing (Msg(..))
import Msg.User.Msg as UserMsg


view : State -> Html Msg
view state =
    case state of
        Top ->
            Html.div
                []
                []

        Fetched user ->
            let
                stake : (User -> Amount) -> Primary -> Html Msg
                stake f primary =
                    case (f user).amount == 0 of
                        True ->
                            Html.div
                                []
                                [ Html.button
                                    [ onClick <|
                                        FromUser <|
                                            UserMsg.Stake <|
                                                primary
                                    ]
                                    [ Html.text
                                        """stake
                                        """
                                    ]
                                ]

                        False ->
                            Html.div
                                []
                                [ Html.div
                                    []
                                    [ Html.text <|
                                        String.concat
                                            [ "your stake"
                                            , ":"
                                            , " "
                                            , "$SOL"
                                            , " "
                                            , (f user).formatted
                                            ]
                                    ]
                                , Html.div
                                    []
                                    [ Html.button
                                        [ onClick <|
                                            FromUser <|
                                                UserMsg.Harvest <|
                                                    primary
                                        ]
                                        [ Html.text
                                            """harvest
                                            """
                                        ]
                                    ]
                                ]

                stakeRed =
                    stake (\u -> u.pools.red.staked) Primary.Red

                stakedGreen =
                    stake (\u -> u.pools.green.staked) Primary.Green

                stakedBlue =
                    stake (\u -> u.pools.blue.staked) Primary.Blue
            in
            Html.div
                []
                [ Html.div
                    [ class "mb-6"
                    ]
                    [ Html.text <|
                        String.concat
                            [ "TVL"
                            , ":"
                            , " "
                            , "$SOL"
                            , " "
                            , user.tvl.formatted
                            , " "
                            , "😎"
                            ]
                    ]
                , Html.div
                    []
                    [ Html.div
                        [ class "columns"
                        ]
                        [ Html.div
                            [ class "column is-one-third"
                            ]
                            [ Html.div
                                []
                                [ Html.h3
                                    []
                                    [ Html.text
                                        """$R
                                        """
                                    ]
                                ]
                            , Html.div
                                []
                                [ Html.text <|
                                    String.concat
                                        [ "TVL"
                                        , ":"
                                        , " "
                                        , "$SOL"
                                        , " "
                                        , user.pools.red.tvl.formatted
                                        , "🟥"
                                        ]
                                ]
                            , Html.div
                                []
                                [ stakeRed
                                ]
                            ]
                        , Html.div
                            [ class "column is-one-third"
                            ]
                            [ Html.div
                                []
                                [ Html.h3
                                    []
                                    [ Html.text
                                        """$G
                                        """
                                    ]
                                ]
                            , Html.div
                                []
                                [ Html.text <|
                                    String.concat
                                        [ "TVL"
                                        , ":"
                                        , " "
                                        , "$SOL"
                                        , " "
                                        , user.pools.green.tvl.formatted
                                        , "🟩"
                                        ]
                                ]
                            , Html.div
                                []
                                [ stakedGreen
                                ]
                            ]
                        , Html.div
                            [ class "column is-one-third"
                            ]
                            [ Html.div
                                []
                                [ Html.h3
                                    []
                                    [ Html.text
                                        """$B
                                        """
                                    ]
                                ]
                            , Html.div
                                []
                                [ Html.text <|
                                    String.concat
                                        [ "TVL"
                                        , ":"
                                        , " "
                                        , "$SOL"
                                        , " "
                                        , user.pools.blue.tvl.formatted
                                        , "🟦"
                                        ]
                                ]
                            , Html.div
                                []
                                [ stakedBlue
                                ]
                            ]
                        ]
                    ]
                ]
