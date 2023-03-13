module View.Header exposing (view)

import Html exposing (Html)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Model.State.Global.Global exposing (Global(..))
import Model.Wallet as Wallet
import Msg.Global as FromGlobal
import Msg.Msg as Msg exposing (Msg(..))


view : Global -> Html Msg
view global =
    Html.nav
        [ class "level"
        ]
        [ Html.div
            [ class "level-left mx-5 my-3"
            ]
            [ Html.div
                [ class "level-item"
                ]
                [ left global
                ]
            ]
        , Html.div
            [ class "level-right mx-5 my-3"
            ]
            [ Html.div
                [ class "level-item"
                ]
                [ right global
                ]
            ]
        ]

left : Global -> Html Msg
left global =
    case global of
        NoWalletYet ->
            Html.div
                []
                []


        WalletMissing ->
            Html.div
                []
                []


        HasUser _ ->
            Html.div
                [ class "is-text-container-4"
                ]
                [ Html.h1
                    [ class "is-size-4"
                    ]
                    [ Html.text "rgb.industries"
                    ]
                ]


right : Global -> Html Msg
right global =
    case global of
        NoWalletYet ->
            Html.div
                []
                []

        WalletMissing ->
            Html.div
                []
                []

        HasUser user ->
            Html.div
                [ class "is-text-container-4"
                ]
                [ Html.button
                    [ class "is-button-2 is-size-4"
                    , onClick <| Msg.Global FromGlobal.Disconnect
                    ]
                    [ Html.text <|
                        Wallet.slice user.wallet
                    ]
                ]
