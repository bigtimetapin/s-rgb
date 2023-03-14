module View.User.Header exposing (body)

import Html exposing (Html)
import Html.Attributes exposing (class, style)
import Html.Events exposing (onClick)
import Model.User.State.State as State exposing (State)
import Model.User.User exposing (User)
import Msg.Msg exposing (Msg(..))
import Msg.User.Msg as UserMsg


body : User -> (User -> State) -> Html Msg
body user f =
    let
        hightlight_ =
            highlight (f user)

        click_ =
            click user
    in
    Html.div
        [ style "align-items" "center"
        , style "justify-content" "center"
        , style "display" "flex"
        ]
        [ Html.div
            [ class "px-3 has-vertical-line-right"
            ]
            [ Html.button
                [ class <|
                    String.concat
                        [ "has-text-weight-bold"
                        , hightlight_ Stake
                        ]
                , onClick <|
                    click_ Stake
                ]
                [ Html.div
                    [ class "is-size-4"
                    ]
                    [ Html.text "STAKE"
                    ]
                ]
            ]
        , Html.div
            [ class "px-3 has-vertical-line-right"
            ]
            [ Html.button
                [ class <|
                    String.concat
                        [ "has-text-weight-bold"
                        , hightlight_ Mix
                        ]
                , onClick <|
                    click_ Mix
                ]
                [ Html.div
                    [ class "is-size-4"
                    ]
                    [ Html.text "MIX"
                    ]
                ]
            ]
        , Html.div
            [ class "px-3 has-vertical-line-right"
            ]
            [ Html.button
                [ class <|
                    String.concat
                        [ "has-text-weight-bold"
                        , hightlight_ Vault
                        ]
                , onClick <|
                    click_ Vault
                ]
                [ Html.div
                    [ class "is-size-4"
                    ]
                    [ Html.text "VAULT"
                    ]
                ]
            ]
        , Html.div
            [ class "px-3 has-vertical-line-right"
            ]
            [ Html.button
                [ class "is-button-2 has-text-weight-bold is-disabled"
                ]
                [ Html.div
                    [ class "is-size-4"
                    ]
                    [ Html.text "TRADE"
                    ]
                ]
            ]
        , Html.div
            [ class "px-3"
            ]
            [ Html.button
                [ class <|
                    String.concat
                        [ "has-text-weight-bold"
                        , hightlight_ Paint
                        ]
                , onClick <|
                    click_ Paint
                ]
                [ Html.div
                    [ class "is-size-4"
                    ]
                    [ Html.text "PAINT"
                    ]
                ]
            ]
        ]


click : User -> This -> Msg
click user this =
    let
        msg =
            case this of
                Stake ->
                    UserMsg.HrefStake user

                Mix ->
                    UserMsg.HrefMix user

                Vault ->
                    UserMsg.HrefVault user

                Paint ->
                    UserMsg.HrefPaint user
    in
    FromUser msg


highlight : State -> This -> String
highlight state this =
    let
        class =
            " is-button-1"
    in
    case ( this, state ) of
        ( Stake, State.Stake _ ) ->
            class

        ( Mix, State.Mix _ ) ->
            class

        ( Vault, State.Vault _ ) ->
            class

        ( Paint, State.Paint _ _ ) ->
            class

        _ ->
            " is-button-2"


type This
    = Stake
    | Mix
    | Vault
    | Paint
