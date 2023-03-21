module View.User.Vault exposing (body)

import Html exposing (Html)
import Html.Attributes exposing (class, src, style)
import Model.Pixel exposing (Pixel)
import Model.User.State.State as State
import Model.User.User as User exposing (User)
import Msg.Msg exposing (Msg)
import View.User.Header


body : User -> Html Msg
body user =
    let
        getPixelBalance =
            User.getPixelBalance user
    in
    Html.div
        []
        [ Html.div
            [ class "mb-6"
            ]
            [ View.User.Header.body user State.Vault
            ]
        , Html.div
            [ class "mb-6"
            ]
            [ Html.div
                [ style "align-items" "center"
                , style "justify-content" "center"
                , style "display" "flex"
                ]
                [ Html.div
                    [ class "mr-3"
                    ]
                    [ pixelColumn
                        "has-red"
                        (User.getPixel
                            { r = 1
                            , g = 0
                            , b = 0
                            , depth = 1
                            }
                            |> getPixelBalance
                        )
                    ]
                , Html.div
                    [ class "mr-3"
                    ]
                    [ pixelColumn
                        "has-green"
                        (User.getPixel
                            { r = 0
                            , g = 1
                            , b = 0
                            , depth = 1
                            }
                            |> getPixelBalance
                        )
                    ]
                , Html.div
                    [ class "mr-3"
                    ]
                    [ pixelColumn
                        "has-blue"
                        (User.getPixel
                            { r = 0
                            , g = 0
                            , b = 1
                            , depth = 1
                            }
                            |> getPixelBalance
                        )
                    ]
                , Html.div
                    [ class "mr-3"
                    ]
                    [ pixelColumn
                        "has-yellow"
                        (User.getPixel
                            { r = 1
                            , g = 1
                            , b = 0
                            , depth = 1
                            }
                            |> getPixelBalance
                        )
                    ]
                , Html.div
                    [ class "mr-3"
                    ]
                    [ pixelColumn
                        "has-magenta"
                        (User.getPixel
                            { r = 1
                            , g = 0
                            , b = 1
                            , depth = 1
                            }
                            |> getPixelBalance
                        )
                    ]
                , Html.div
                    [ class "mr-3"
                    ]
                    [ pixelColumn
                        "has-cyan"
                        (User.getPixel
                            { r = 0
                            , g = 1
                            , b = 1
                            , depth = 1
                            }
                            |> getPixelBalance
                        )
                    ]
                , Html.div
                    [ class "mr-3"
                    ]
                    [ pixelColumn
                        "has-white"
                        (User.getPixel
                            { r = 1
                            , g = 1
                            , b = 1
                            , depth = 1
                            }
                            |> getPixelBalance
                        )
                    ]
                ]
            ]
        , Html.div
            []
            [ Html.div
                [ class "columns is-multiline"
                ]
              <|
                List.map
                    (\proof ->
                        Html.div
                            [ class "column is-4"
                            ]
                            [ Html.img
                                [ src proof.nft.url
                                ]
                                []
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
                                                    [ Html.text "burned"
                                                    ]
                                                , Html.th
                                                    []
                                                    [ Html.text "1"
                                                    ]
                                                , Html.th
                                                    []
                                                    [ Html.text "2"
                                                    ]
                                                , Html.th
                                                    []
                                                    [ Html.text "3"
                                                    ]
                                                , Html.th
                                                    []
                                                    [ Html.text "4"
                                                    ]
                                                , Html.th
                                                    []
                                                    [ Html.text "5"
                                                    ]
                                                , Html.th
                                                    []
                                                    [ Html.text "6"
                                                    ]
                                                , Html.th
                                                    []
                                                    [ Html.text "7"
                                                    ]
                                                ]
                                            ]
                                        , Html.tr
                                            []
                                            [ Html.td
                                                []
                                                [ Html.text <|
                                                    (\bool ->
                                                        case bool of
                                                            True ->
                                                                "true"

                                                            False ->
                                                                "false"
                                                    )
                                                        proof.burned.burned
                                                ]
                                            , Html.td
                                                []
                                                [ Html.text <|
                                                    String.fromInt <|
                                                        (\maybe ->
                                                            case maybe of
                                                                Just int ->
                                                                    int

                                                                Nothing ->
                                                                    0
                                                        )
                                                            (Maybe.map
                                                                .amount
                                                                proof.burned.plan.one
                                                            )
                                                ]
                                            , Html.td
                                                []
                                                [ Html.text <|
                                                    String.fromInt <|
                                                        (\maybe ->
                                                            case maybe of
                                                                Just int ->
                                                                    int

                                                                Nothing ->
                                                                    0
                                                        )
                                                            (Maybe.map
                                                                .amount
                                                                proof.burned.plan.two
                                                            )
                                                ]
                                            , Html.td
                                                []
                                                [ Html.text <|
                                                    String.fromInt <|
                                                        (\maybe ->
                                                            case maybe of
                                                                Just int ->
                                                                    int

                                                                Nothing ->
                                                                    0
                                                        )
                                                            (Maybe.map
                                                                .amount
                                                                proof.burned.plan.three
                                                            )
                                                ]
                                            , Html.td
                                                []
                                                [ Html.text <|
                                                    String.fromInt <|
                                                        (\maybe ->
                                                            case maybe of
                                                                Just int ->
                                                                    int

                                                                Nothing ->
                                                                    0
                                                        )
                                                            (Maybe.map
                                                                .amount
                                                                proof.burned.plan.four
                                                            )
                                                ]
                                            , Html.td
                                                []
                                                [ Html.text <|
                                                    String.fromInt <|
                                                        (\maybe ->
                                                            case maybe of
                                                                Just int ->
                                                                    int

                                                                Nothing ->
                                                                    0
                                                        )
                                                            (Maybe.map
                                                                .amount
                                                                proof.burned.plan.five
                                                            )
                                                ]
                                            , Html.td
                                                []
                                                [ Html.text <|
                                                    String.fromInt <|
                                                        (\maybe ->
                                                            case maybe of
                                                                Just int ->
                                                                    int

                                                                Nothing ->
                                                                    0
                                                        )
                                                            (Maybe.map
                                                                .amount
                                                                proof.burned.plan.six
                                                            )
                                                ]
                                            , Html.td
                                                []
                                                [ Html.text <|
                                                    String.fromInt <|
                                                        (\maybe ->
                                                            case maybe of
                                                                Just int ->
                                                                    int

                                                                Nothing ->
                                                                    0
                                                        )
                                                            (Maybe.map
                                                                .amount
                                                                proof.burned.plan.seven
                                                            )
                                                ]
                                            ]
                                        ]
                                    ]
                                ]
                            ]
                    )
                    user.nfts
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


pixelColumn : String -> Int -> Html Msg
pixelColumn color balance =
    Html.div
        [ class "is-color-block-container"
        ]
        [ Html.div
            [ class <|
                String.concat
                    [ "is-small-color-block"
                    , " "
                    , color
                    ]
            ]
            []
        , Html.div
            [ class "is-small-color-block-balance is-text-container-6"
            ]
            [ Html.div
                [ class "is-size-6"
                ]
                [ Html.text <|
                    String.concat
                        [ String.fromInt balance
                        , "x"
                        ]
                ]
            ]
        ]
