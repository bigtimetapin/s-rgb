module View.Admin.View exposing (view)

import Html exposing (Html)
import Html.Events exposing (onClick)
import Model.Admin.State exposing (State(..))
import Msg.Admin.Msg as AdminMsg
import Msg.Msg exposing (Msg(..))


view : State -> Html Msg
view state =
    case state of
        Top ->
            Html.div
                []
                [ Html.button
                    [ onClick <|
                        FromAdmin <|
                            AdminMsg.Init
                    ]
                    [ Html.text
                        """init
                        """
                    ]
                ]
