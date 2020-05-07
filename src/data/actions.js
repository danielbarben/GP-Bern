let actions = {
  2: {msg:"Du kommst wegen langer Warteschlangen vor dem WC nicht rechtzeitig in deinen Startblock. 1× aussetzen",action:1},
  7: {msg:"Du fühlst dich grossartig, fliegst den Aargauerstalden hinab und überholst Dutzende Läufer. Noch einmal Würfeln",action:2},
  17: {msg:"Deine Freunde sitzen in der Kramgasse beim Apéro, um dich anzufeuern. Du aber brauchst einen Schluck. 1× aussetzen",action:1},
  26: {msg:"Du gibst abwärts Gas und überholst drei drahtige Senioren, die gemütlich miteinander plaudern. 6 Felder vorrücken",action:4},
  31: {msg:"Es zieht in der Kniekehle, du bekommst keine Luft. Du ranntest zu schnell hinunter, es rächt sich im Flachen brutal. 6 Felder zurück",action:3},
  36: {msg:"Erster Verpflegungsstand. Du bist schlau und gönnst dir einen Becher Wasser. Noch einmal würfeln",action:2},
  43: {msg:"Erste Steigung. Stress. Mit aufgerissenen Augen starrst du das Schulter-Tattoo der Läuferin vor dir an. 6 Felder zurück.",action:3},
  52: {msg:"Piriformis-Alarm in der grünen Hölle! Der hinterhältige Ehrgeiz-Muskel im Gesäss meldet sich schmerzhaft. Du musst dein Tempo zügeln. 1× aussetzen.",action:1},
  58: {msg:"Triumphaler Blick über die silbern glänzende Monbijoubrücke. Das Runner's High fährt ins Hirn wie ein fetter Joint. Noch einmal würfeln",action:2},
  66: {msg:"10 Kilometer gelaufen. Das Runner’s High ist wie weggeblasen, das Ziel ist gefühlt am andern Ende der Welt. 6 Felder zurück",action:3},
  77: {msg:"Die hinterhältigste Streckenschlaufe der Welt. Man könnte eine Abkürzung nehmen, aber du bleibst auf der Strecke. Bravo. 6 Felder vorrücken", action:4},
  79: {msg:"Diese kleine, fiese Steigung hattest du nicht auf der Rechnung. What a f***! Du musst ein paar Schritte gehen. 1× aussetzen.",action:1},
  82: {msg:"Das grösste Spalier deiner Karriere, aber deine Beine hart wie Bambus. Du gibst alles, um locker ins Publikum zu winken. Ein Hoch auf deine schauspielerische Leistung. Noch einmal würfeln",action:2},
  88: {msg:"Diese nervigen Pflastersteine! Du stolperst und musst die Schuhe neu binden. 1× aussetzen",action:1},
  98: {msg:"Du hast das Gefühl, du stehst unten an der Eigernordwand, aber du besiegst deine Selbstzweifel. 6 Felder vorrücken",action:4},
  105: {msg:"Zu wenig trainiert! Ein Krampf in der Wade bremst deinen Schlussspurt. 1× aussetzen",action:1},
  106: {msg:"Du hast noch Reserven und ziehst durch. 6 Felder vorrücken",action:4}
};
export default actions

//1: einmal aussetzen
//2: noch einmal würfeln
//3: 6 zurück
//4: 6 vorwärts