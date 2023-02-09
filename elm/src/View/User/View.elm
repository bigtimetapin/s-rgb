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

                balance : (User -> Amount) -> Primary -> Html Msg
                balance f primary =
                    Html.div
                        []
                        [ Html.div
                            []
                            [ Html.text <|
                                String.concat
                                    [ "your balance"
                                    , ":"
                                    , " "
                                    , Primary.toSymbol primary
                                    , " "
                                    , (f user).formatted
                                    ]
                            ]
                        ]

                balanceRed =
                    balance (\u -> u.pools.red.balance) Primary.Red

                balanceGreen =
                    balance (\u -> u.pools.green.balance) Primary.Green

                balanceBlue =
                    balance (\u -> u.pools.blue.balance) Primary.Blue
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
                                    [ Html.text <|
                                        Primary.toSymbol Primary.Red
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
                            , Html.div
                                []
                                [ balanceRed
                                ]
                            ]
                        , Html.div
                            [ class "column is-one-third"
                            ]
                            [ Html.div
                                []
                                [ Html.h3
                                    []
                                    [ Html.text <|
                                        Primary.toSymbol Primary.Green
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
                            , Html.div
                                []
                                [ balanceGreen
                                ]
                            ]
                        , Html.div
                            [ class "column is-one-third"
                            ]
                            [ Html.div
                                []
                                [ Html.h3
                                    []
                                    [ Html.text <|
                                        Primary.toSymbol Primary.Blue
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
                            , Html.div
                                []
                                [ balanceBlue
                                ]
                            ]
                        ]
                    , Html.div
                        [
                        ]
                        [ Html.button
                            [ class "button"
                            , onClick <|
                                FromUser <|
                                    UserMsg.InitPixel
                                        { r = 1
                                        , g = 1
                                        , b = 1
                                        , depth = 1
                                        }
                            ]
                            [ Html.text
                                """init pixel
                                """
                            ]
                        ]
                    ]
                ]
