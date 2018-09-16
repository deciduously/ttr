module Main exposing (Model, Msg(..), init, main, update, view)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode exposing (Decoder, field, int, map2, string)



-- MAIN


main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }



-- MODEL


type alias Player =
    { name : String
    , chutzpah : Int
    }


type alias Tile =
    { id : String
    , name : String
    }


type alias Model =
    { player : Player
    , currentTile : Tile
    }


defaultModel : Model
defaultModel =
    { player = { name = "Ben", chutzpah = 0 }, currentTile = { id = "0", name = "Ship" } }


init : () -> ( Model, Cmd Msg )
init _ =
    ( defaultModel
    , getNewGame
    )



-- UPDATE


type Msg
    = Increment
    | NewGame (Result Http.Error Model)


incrementChutzpah : Player -> Player
incrementChutzpah player =
    { player | chutzpah = player.chutzpah + 1 }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Increment ->
            ( { model | player = incrementChutzpah model.player }
            , Cmd.none
            )

        NewGame result ->
            case result of
                Ok newGame ->
                    ( newGame
                    , Cmd.none
                    )

                Err e ->
                    ( model
                    , Cmd.none
                    )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ h2 [] [ text model.player.name ]
        , h3 [] [ text model.currentTile.name ]
        , p [] [ model.player.chutzpah |> String.fromInt |> text ]
        , button [ onClick Increment ] [ text "More Chutzpah!" ]
        , br [] []
        ]



-- HTTP


getNewGame : Cmd Msg
getNewGame =
    Http.send NewGame (Http.get "http://127.0.0.1:8080/game" gameDecoder)


playerDecoder : Decoder Player
playerDecoder =
    map2 Player
        (field "name" string)
        (field "chutzpah" int)


tileDecoder : Decoder Tile
tileDecoder =
    map2 Tile
        (field "id" string)
        (field "name" string)


gameDecoder : Decoder Model
gameDecoder =
    map2 Model
        (field "player" playerDecoder)
        (field "currentTile" tileDecoder)
