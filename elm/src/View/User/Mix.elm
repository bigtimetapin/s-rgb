module View.User.Mix exposing (body)

import Html exposing (Html)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Model.User.State as State
import Model.User.User exposing (User)
import Msg.Msg exposing (Msg(..))
import Msg.User.Msg as UserMsg
import View.User.Header


body : User -> Html Msg
body user =
    Html.div
        []
        [ Html.div
            [ class "mb-2"
            ]
            [ View.User.Header.body user State.Mix
            ]
        , Html.div
            [ class "columns is-multiline"
            ]
            [ Html.div
                [ class "column is-2"
                ]
                [ Html.button
                    [ class "button"
                    , onClick <|
                        FromUser <|
                            UserMsg.MintPixel
                                { r = 1
                                , g = 0
                                , b = 0
                                , depth = 1
                                }
                    ]
                    [ Html.text
                        """mint pixel: (1, 0, 0) d=1
                        """
                    ]
                ]
            , Html.div
                [ class "column is-2"
                ]
                [ Html.button
                    [ class "button"
                    , onClick <|
                        FromUser <|
                            UserMsg.MintPixel
                                { r = 0
                                , g = 1
                                , b = 0
                                , depth = 1
                                }
                    ]
                    [ Html.text
                        """mint pixel: (0, 1, 0) d=1
                        """
                    ]
                ]
            , Html.div
                [ class "column is-2"
                ]
                [ Html.button
                    [ class "button"
                    , onClick <|
                        FromUser <|
                            UserMsg.MintPixel
                                { r = 0
                                , g = 0
                                , b = 1
                                , depth = 1
                                }
                    ]
                    [ Html.text
                        """mint pixel: (0, 0, 1) d=1
                        """
                    ]
                ]
            , Html.div
                [ class "column is-2"
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
                        """mint pixel: (1, 1, 0) d=1
                        """
                    ]
                ]
            , Html.div
                [ class "column is-2"
                ]
                [ Html.button
                    [ class "button"
                    , onClick <|
                        FromUser <|
                            UserMsg.MintPixel
                                { r = 1
                                , g = 0
                                , b = 1
                                , depth = 1
                                }
                    ]
                    [ Html.text
                        """mint pixel: (1, 0, 1) d=1
                        """
                    ]
                ]
            , Html.div
                [ class "column is-2"
                ]
                [ Html.button
                    [ class "button"
                    , onClick <|
                        FromUser <|
                            UserMsg.MintPixel
                                { r = 0
                                , g = 1
                                , b = 1
                                , depth = 1
                                }
                    ]
                    [ Html.text
                        """mint pixel: (0, 1, 1) d=1
                        """
                    ]
                ]
            , Html.div
                [ class "column is-2"
                ]
                [ Html.button
                    [ class "button"
                    , onClick <|
                        FromUser <|
                            UserMsg.MintPixel
                                { r = 1
                                , g = 1
                                , b = 1
                                , depth = 1
                                }
                    ]
                    [ Html.text
                        """mint pixel: (1, 1, 1) d=1
                        """
                    ]
                ]
            , Html.div
                [ class "column is-2"
                ]
                [ Html.button
                    [ class "button"
                    , onClick <|
                        FromUser <|
                            UserMsg.MintPixel
                                { r = 0
                                , g = 0
                                , b = 0
                                , depth = 1
                                }
                    ]
                    [ Html.text
                        """mint pixel: (0, 0, 0) d=1
                        """
                    ]
                ]
            ]
        ]
