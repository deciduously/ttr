open Tea.App
open Tea.Html

(* Model *)

type player = {name: string; chutzpah: int}

type tile = {id: string; name: string}

type model = {player: player; tile: tile}

let defaultModel =
  {player= {name= "Ben"; chutzpah= 0}; tile= {id= "0"; name= "Ship"}}

(* Update *)

let incrementChutzpah player = {player with chutzpah= player.chutzpah + 1}

let decrementChutzpah player = {player with chutzpah= player.chutzpah - 1}

let setChutzpah player amt = {player with chutzpah= amt}

type msg = Increment | Decrement | Reset | Set of int
[@@bs.deriving {accessors}]

let init () = (defaultModel, Tea.Cmd.none)

let update model = function
  | Increment ->
      ({model with player= incrementChutzpah model.player}, Tea.Cmd.none)
  | Decrement ->
      ({model with player= decrementChutzpah model.player}, Tea.Cmd.none)
  | Reset -> ({model with player= setChutzpah model.player 0}, Tea.Cmd.none)
  | Set v -> ({model with player= setChutzpah model.player v}, Tea.Cmd.none)

(* View *)

let view_button title msg = button [onClick msg] [text title]

let view_player (player : player) =
  div []
    [h1 [] [text player.name]; h2 [] [player.chutzpah |> string_of_int |> text]]

let view model =
  div []
    [ span [style "text-weight" "bold"] [view_player model.player]
    ; br []
    ; view_button "Increment" Increment
    ; br []
    ; view_button "Decrement" Decrement
    ; br []
    ; view_button "Set to 42" (Set 42)
    ; br []
    ; (if model.player.chutzpah <> 0 then view_button "Reset" Reset else noNode)
    ]

(* Entry *)

let main =
  standardProgram {init; update; view; subscriptions= (fun _ -> Tea.Sub.none)}
