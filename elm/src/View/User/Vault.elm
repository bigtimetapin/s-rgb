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
                                                    [ Html.text "y"
                                                    ]
                                                , Html.th
                                                    []
                                                    [ Html.text "m"
                                                    ]
                                                , Html.th
                                                    []
                                                    [ Html.text "c"
                                                    ]
                                                , Html.th
                                                    []
                                                    [ Html.text "w"
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
                                                    String.fromInt proof.burned.plan.red
                                                ]
                                            , Html.td
                                                []
                                                [ Html.text <|
                                                    String.fromInt proof.burned.plan.green
                                                ]
                                            , Html.td
                                                []
                                                [ Html.text <|
                                                    String.fromInt proof.burned.plan.blue
                                                ]
                                            , Html.td
                                                []
                                                [ Html.text <|
                                                    String.fromInt proof.burned.plan.yellow
                                                ]
                                            , Html.td
                                                []
                                                [ Html.text <|
                                                    String.fromInt proof.burned.plan.magenta
                                                ]
                                            , Html.td
                                                []
                                                [ Html.text <|
                                                    String.fromInt proof.burned.plan.cyan
                                                ]
                                            , Html.td
                                                []
                                                [ Html.text <|
                                                    String.fromInt proof.burned.plan.white
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
