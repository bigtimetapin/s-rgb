module View.User.View exposing (view)

import Html exposing (Html)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Model.Amount exposing (Amount)
import Model.Pixel exposing (Pixel)
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
                                    UserMsg.MintPixel
                                        { r = 1
                                        , g = 1
                                        , b = 0
                                        , depth = 1
                                        }
                            ]
                            [ Html.text
                                """mint pixel
                                """
                            ]
                        ]
                    , Html.div
                        []
                        [ Html.div
                            [ class "table-container"
                            ]
                            [ Html.table
                                [ class "table is-fullwidth"
                                ]
                                [ Html.thead
                                    []
                                    [ Html.tr
                                        []
                                        [ Html.th
                                            []
                                            [ Html.text "depth"
                                            ]
                                        , Html.th
                                            []
                                            [ Html.text "r"
                                            ]
                                        , Html.th
                                            []
                                            [ Html.text "g"
                                            ]
                                        , Html.th
                                            []
                                            [ Html.text "b"
                                            ]
                                        , Html.th
                                            []
                                            [ Html.text "balance"
                                            ]
                                        ]
                                    ]
                                , Html.tbody
                                    [] <|
                                    List.map
                                        pixelRow
                                        (List.concatMap
                                            .pixels
                                            user.palette
                                        )
                                ]
                            ]
                        ]
                    ]
                ]

pixelRow : Pixel -> Html Msg
pixelRow pixel =
    Html.tr
        []
        [ Html.td
            []
            [ Html.text <|
                String.fromInt pixel.seeds.depth
            ]
        , Html.td
            []
            [ Html.text <|
                String.fromInt pixel.seeds.r
            ]
        , Html.td
            []
            [ Html.text <|
                String.fromInt pixel.seeds.g
            ]
        , Html.td
            []
            [ Html.text <|
                String.fromInt pixel.seeds.b
            ]
        , Html.td
            []
            [ Html.text <|
                String.fromInt pixel.balance
            ]
        ]
