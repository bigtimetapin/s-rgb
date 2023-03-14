module View.User.Stake exposing (body)

import Html exposing (Html)
import Html.Attributes exposing (class, style)
import Html.Events exposing (onClick)
import Model.Amount exposing (Amount)
import Model.Primary as Primary exposing (Primary)
import Model.User.State as State
import Model.User.User exposing (User)
import Msg.Msg exposing (Msg(..))
import Msg.User.Msg as UserMsg
import View.User.Header


body : User -> Html Msg
body user =
    let
        stake : (User -> Amount) -> Primary -> ( Html Msg, Html Msg )
        stake f primary =
            case (f user).amount == 0 of
                True ->
                    ( Html.div
                        []
                        []
                    , Html.div
                        []
                        [ Html.button
                            [ class "is-button-4 is-size-3 has-text-weight-bold"
                            , style "width" "100%"
                            , onClick <|
                                FromUser <|
                                    UserMsg.Stake <|
                                        primary
                            ]
                            [ Html.text
                                """STAKE
                                """
                            ]
                        ]
                    )

                False ->
                    ( Html.div
                        [ class "is-text-container-6"
                        ]
                        [ Html.div
                            [ class "is-size-6"
                            ]
                            [ Html.text <|
                                String.concat
                                    [ "$SOL"
                                    , " "
                                    , (f user).formatted
                                    ]
                            ]
                        ]
                    , Html.div
                        []
                        [ Html.button
                            [ class "is-button-4 is-size-3 has-text-weight-bold"
                            , style "width" "100%"
                            , onClick <|
                                FromUser <|
                                    UserMsg.Harvest <|
                                        primary
                            ]
                            [ Html.text
                                """HARVEST
                                    """
                            ]
                        ]
                    )

        ( stakeRedBalance, stakeRedButton ) =
            stake (\u -> u.pools.red.staked) Primary.Red

        ( stakeGreenBalance, stakeGreenButton ) =
            stake (\u -> u.pools.green.staked) Primary.Green

        ( stakeBlueBalance, stakeBlueButton ) =
            stake (\u -> u.pools.blue.staked) Primary.Blue

        balance : (User -> Amount) -> Primary -> Html Msg
        balance f primary =
            Html.div
                []
                [ Html.div
                    [ class "is-text-container-6"
                    ]
                    [ Html.div
                        [ class "is-size-6"
                        ]
                        [ Html.text <|
                            String.concat
                                [ Primary.toSymbol primary
                                , " "
                                , (f user).formatted
                                ]
                        ]
                    ]
                ]

        balanceRed =
            balance (\u -> u.pools.red.balance) Primary.Red

        balanceGreen =
            balance (\u -> u.pools.green.balance) Primary.Green

        balanceBlue =
            balance (\u -> u.pools.blue.balance) Primary.Blue

        tvl formatted =
            Html.div
                [ class "is-text-container-6"
                ]
                [ Html.div
                    [ class "is-size-6"
                    ]
                    [ Html.text <|
                        String.concat
                            [ "$SOL"
                            , " "
                            , formatted
                            ]
                    ]
                ]

        tvlRed =
            tvl user.pools.red.tvl.formatted

        tvlGreen =
            tvl user.pools.green.tvl.formatted

        tvlBlue =
            tvl user.pools.blue.tvl.formatted
    in
    Html.div
        [ class "has-text-centered"
        ]
        [ Html.div
            [ class "mb-6"
            ]
            [ View.User.Header.body user State.Stake
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
                        [ class "mb-6"
                        ]
                        [ toString Primary.Red
                        ]
                    , Html.div
                        [ class "mb-3"
                        ]
                        [ table tvlRed balanceRed stakeRedBalance
                        ]
                    , Html.div
                        []
                        [ stakeRedButton
                        ]
                    ]
                , Html.div
                    [ class "column is-one-third"
                    ]
                    [ Html.div
                        [ class "mb-6"
                        ]
                        [ toString Primary.Green
                        ]
                    , Html.div
                        [ class "mb-3"
                        ]
                        [ table tvlGreen balanceGreen stakeGreenBalance
                        ]
                    , Html.div
                        []
                        [ stakeGreenButton
                        ]
                    ]
                , Html.div
                    [ class "column is-one-third"
                    ]
                    [ Html.div
                        [ class "mb-6"
                        ]
                        [ toString Primary.Blue
                        ]
                    , Html.div
                        [ class "mb-3"
                        ]
                        [ table tvlBlue balanceBlue stakeBlueBalance
                        ]
                    , Html.div
                        []
                        [ stakeBlueButton
                        ]
                    ]
                ]
            ]
        ]


toString : Primary -> Html Msg
toString primary =
    Html.div
        [ class "is-text-container-6 has-text-weight-bold"
        ]
        [ Html.div
            [ class <|
                String.concat
                    [ "is-size-1"
                    , " "
                    , Primary.text primary
                    ]
            , style "text-transform" "uppercase"
            ]
            [ Html.text <|
                Primary.toString primary
            ]
        ]


table : Html Msg -> Html Msg -> Html Msg -> Html Msg
table tvl_ balance_ stake_ =
    Html.div
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
                        [ Html.div
                            [ class "is-light-text-container-6"
                            ]
                            [ Html.div
                                [ class "is-size-6"
                                ]
                                [ Html.text "tvl"
                                ]
                            ]
                        ]
                    , Html.th
                        []
                        [ Html.div
                            [ class "is-light-text-container-6"
                            ]
                            [ Html.div
                                [ class "is-size-6"
                                ]
                                [ Html.text "your balance"
                                ]
                            ]
                        ]
                    , Html.th
                        []
                        [ Html.div
                            [ class "is-light-text-container-6"
                            ]
                            [ Html.div
                                [ class "is-size-6"
                                ]
                                [ Html.text "your stake"
                                ]
                            ]
                        ]
                    ]
                ]
            , Html.tbody
                []
                [ Html.tr
                    []
                    [ Html.td
                        []
                        [ tvl_
                        ]
                    , Html.td
                        []
                        [ balance_
                        ]
                    , Html.td
                        []
                        [ stake_
                        ]
                    ]
                ]
            ]
        ]
