module Model.Color exposing (Color(..), toClass)


type Color
    = Black
    | White


toClass : Color -> String
toClass color =
    case color of
        Black ->
            "has-black"

        White ->
            "has-white"
