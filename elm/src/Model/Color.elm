module Model.Color exposing (Color(..), toClass)


type Color
    = Black
    | White
    | Red
    | Green
    | Blue
    | Yellow
    | Magenta
    | Cyan


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
