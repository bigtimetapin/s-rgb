module View.User.Vault exposing (body)

import Html exposing (Html)
import Html.Attributes exposing (class, src)
import Model.Pixel exposing (Pixel)
import Model.User.User exposing (User)
import Msg.Msg exposing (Msg)


body : User -> Html Msg
body user =
    Html.div
        []
        [ Html.div
            [ class "mb-6"
            ]
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
                        []
                      <|
                        List.map
                            pixelRow
                            (List.concatMap
                                .pixels
                                user.palette
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
