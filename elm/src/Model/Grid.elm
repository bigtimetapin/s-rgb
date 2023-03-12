module Model.Grid exposing (Grid, Plan, Row, encode, init, reduce)

import Json.Encode as Encode
import Model.Cell exposing (Cell)
import Model.Color as Color


type alias Grid =
    List Row


type alias Row =
    List Cell


type alias Plan =
    { white : Int
    , red : Int
    , green : Int
    , blue : Int
    , yellow : Int
    , magenta : Int
    , cyan : Int
    }


init : Grid
init =
    [ List.map
        (\int ->
            { index = int, color = Color.Black }
        )
        (List.range 1 5)
    , List.map
        (\int ->
            { index = int, color = Color.Black }
        )
        (List.range 6 10)
    , List.map
        (\int ->
            { index = int, color = Color.Black }
        )
        (List.range 11 15)
    , List.map
        (\int ->
            { index = int, color = Color.Black }
        )
        (List.range 16 20)
    , List.map
        (\int ->
            { index = int, color = Color.Black }
        )
        (List.range 21 25)
    ]


reduce : Grid -> Plan
reduce grid =
    List.foldl
        (\row plan_ ->
            List.foldl
                (\cell plan__ ->
                    case cell.color of
                        Color.White ->
                            { plan__ | white = plan__.white + 1 }

                        Color.Black ->
                            plan__

                        Color.Red ->
                            { plan__ | red = plan__.red + 1 }

                        Color.Green ->
                            { plan__ | green = plan__.green + 1 }

                        Color.Blue ->
                            { plan__ | blue = plan__.blue + 1 }

                        Color.Yellow ->
                            { plan__ | yellow = plan__.yellow + 1 }

                        Color.Magenta ->
                            { plan__ | magenta = plan__.magenta + 1 }

                        Color.Cyan ->
                            { plan__ | cyan = plan__.cyan + 1 }
                )
                plan_
                row
        )
        { white = 0
        , red = 0
        , green = 0
        , blue = 0
        , yellow = 0
        , magenta = 0
        , cyan = 0
        }
        grid


encode : Plan -> String
encode plan =
    let
        encoder =
            Encode.object
                [ ( "white", Encode.int plan.white )
                ]
    in
    Encode.encode 0 <|
        encoder
