module View.User.Stake exposing (body)

import Html exposing (Html)
import Html.Attributes exposing (class, src, style)
import Html.Events exposing (onClick)
import Model.Amount exposing (Amount)
import Model.Color as Color exposing (Color)
import Model.Primary as Primary exposing (Primary)
import Model.User.State.State as State
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
        []
        [ Html.div
            [ class "mb-6"
            ]
            [ View.User.Header.body user State.Stake
            ]
        , Html.div
            [ class "mb-6 has-text-centered"
            ]
            [ Html.div
                [ class "columns"
                ]
                [ Html.div
                    [ class "column is-one-third"
                    ]
                    [ Html.div
                        [ class "mb-6"
                        ]
                        [ toString 0 Primary.Red
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
                        [ toString 0 Primary.Green
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
                        [ toString 0 Primary.Blue
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
        , Html.div
            [ class "mb-6"
            ]
            [ mint Primary.Red
            ]
        , Html.div
            [ class "mb-6"
            ]
            [ mint Primary.Green
            ]
        , Html.div
            [ class "mb-6"
            ]
            [ mint Primary.Blue
            ]
        ]


toString : Int -> Primary -> Html Msg
toString amount primary =
    let
        text =
            case amount of
                0 ->
                    String.concat
                        [ Primary.toString primary
                        ]

                _ ->
                    String.concat
                        [ String.fromInt amount
                        , " "
                        , Primary.toString primary
                        ]
    in
    Html.div
        [ class "is-text-container-1 has-text-weight-bold"
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
            [ Html.text text
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

mint : Primary -> Html Msg
mint primary =
    let
        color =
            Primary.toColor primary
    in
    Html.div
        [ style "align-items" "center"
        , style "justify-content" "center"
        , style "display" "flex"
        ]
        [ Html.div
            [ class "is-text-container-1 has-text-weight-bold mr-6"
            ]
            [ Html.div
                [ class <|
                    String.concat
                        [ "is-size-1"
                        ]
                , style "text-transform" "uppercase"
                ]
                [ Html.text
                    """burn
                    """
                ]
            ]
        , Html.div
            []
            [ toString 5 primary
            ]
        , Html.div
            []
            [ Html.button
                [ class "is-mint-button"
                , onClick <|
                    FromUser <|
                        UserMsg.MintPixel
                            (Color.toSeeds color)
                ]
                []
            ]
        , Html.div
            [ class "is-color-block-container"
            ]
            [ Html.div
                [ class <|
                    String.concat
                        [ Color.toClass color
                        , " "
                        , "is-color-block"
                        ]
                ]
                []
            , Html.div
                [ class "is-color-block-balance"
                ]
                [ Html.div
                    [ class "is-text-container-6"
                    ]
                    [ Html.div
                        [ class "is-size-6"
                        ]
                        [ Html.text "5 pixels"
                        ]
                    ]
                ]
            ]
        ]
