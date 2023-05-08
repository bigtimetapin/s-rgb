module Model.Grid exposing (Buffer(..), Grid, Plan, Row, encode, init, reduce, resize)

import Json.Encode as Encode
import Model.Cell exposing (Cell)
import Model.Color as Color


type alias Grid =
    { buffer : Buffer
    , grid : List Row
    }


type Buffer
    = Open
    | Closed


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
    resize 24 24


resize : Int -> Int -> Grid
resize x y =
    let
        grid =
            List.map
                (\iy ->
                    let
                        head =
                            ((iy - 1) * x) + 1

                        tail =
                            iy * x
                    in
                    List.map
                        (\int ->
                            { index = int, color = Color.Black }
                        )
                        (List.range head tail)
                )
                (List.range 1 y)
    in
    { buffer = Closed
    , grid = grid
    }


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
        grid.grid


encode : Plan -> String
encode plan =
    let
        encoder =
            Encode.object
                [ ( "white", Encode.int plan.white )
                , ( "red", Encode.int plan.red )
                , ( "green", Encode.int plan.green )
                , ( "blue", Encode.int plan.blue )
                , ( "yellow", Encode.int plan.yellow )
                , ( "magenta", Encode.int plan.magenta )
                , ( "cyan", Encode.int plan.cyan )
                ]
    in
    Encode.encode 0 <|
        encoder
