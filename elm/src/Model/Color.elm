module Model.Color exposing (Color(..), init, toClass, toSeeds)


import Model.Pixel as Pixel
type Color
    = Black
    | White
    | Red
    | Green
    | Blue
    | Yellow
    | Magenta
    | Cyan


init : Color
init =
    White


toClass : Color -> String
toClass color =
    case color of
        Black ->
            "has-black"

        White ->
            "has-white"

        Red ->
            "has-red"

        Green ->
            "has-green"

        Blue ->
            "has-blue"

        Yellow ->
            "has-yellow"

        Magenta ->
            "has-magenta"

        Cyan ->
            "has-cyan"

toSeeds : Color -> Pixel.Seeds
toSeeds color =
    case color of
        Black ->
            { r = 0
            , g = 0
            , b = 0
            , depth = 1
            }

        White ->
            { r = 1
            , g = 1
            , b = 1
            , depth = 1
            }


        Red ->
            { r = 1
            , g = 0
            , b = 0
            , depth = 1
            }


        Green ->
            { r = 0
            , g = 1
            , b = 0
            , depth = 1
            }


        Blue ->
            { r = 0
            , g = 0
            , b = 1
            , depth = 1
            }


        Yellow ->
            { r = 1
            , g = 1
            , b = 0
            , depth = 1
            }


        Magenta ->
            { r = 1
            , g = 0
            , b = 1
            , depth = 1
            }


        Cyan ->
            { r = 0
            , g = 1
            , b = 1
            , depth = 1
            }
