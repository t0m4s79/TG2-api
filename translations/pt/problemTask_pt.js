function problemTask(size, tens, explicit) {

  var instructions = "Por favor, resolva os seguintes problemas.";

  var operations = [
    " + ",
    " + ",
    " + ",
    " + ",
    " + ",
    " + ",
    " - ",
    " * ",
    " * ",
    " * ",
  ];
  var add = [" comprou ", " encontrou ", " adquiriu ", " obteve ", " tem "];
  var subtract = [" deu ", " perdeu "];
  var objects = [
    "Maçãs ",
    " batatas ",
    "cartões",
    "bolachas ",
    " jornais ",
    " lápis ",
    " bilhetes ",
    " CDs ",
  ];
  var sentence = [];
  var sequenceArray = [];
  var sequence;
  var index = 0;
  var number1, number2, number3, number4;
  var object;
  var names;

  // Task generation here, 3 sums text
  if (size < 2) size = 2; // No operations allowed with less than 2!!

  if (explicit == 1) {
    for (i = 0; i < Math.floor(13 - size * 0.7); i++) {
      names = [
        "João",
        "Maria",
        "Sheila",
        "Ana",
        "Roberto",
        "Mónica",
        "Afonso",
        "Martin",
        "Eva",
        "Adam",
        "Teresa",
        "Enrique",
        "Lucas",
        "André",
      ];
      var name = names[Math.floor(Math.random() * names.length)];
      object = objects[Math.floor(Math.random() * objects.length)];

      if (tens == 1) number1 = (Math.floor(Math.random() * 99) + 1).toFixed(0);
      else number1 = (Math.floor(Math.random() * 9) + 1).toFixed(0);

      if (tens == 1) number2 = (Math.floor(Math.random() * 99) + 1).toFixed(0);
      else number2 = (Math.floor(Math.random() * 9) + 1).toFixed(0);

      if (tens == 1) number3 = (Math.floor(Math.random() * 99) + 1).toFixed(0);
      else number3 = (Math.floor(Math.random() * 9) + 1).toFixed(0);

      if (tens == 1) number4 = (Math.floor(Math.random() * 99) + 1).toFixed(0);
      else number4 = (Math.floor(Math.random() * 9) + 1).toFixed(0);

      if (tens == 1) number5 = (Math.floor(Math.random() * 99) + 1).toFixed(0);
      else number5 = (Math.floor(Math.random() * 9) + 1).toFixed(0);

      if (size == 3) {
        if (Math.random() > 0.5)
          sentence +=
            name +
            subtract[Math.floor(Math.random() * subtract.length)] +
            number1 +
            " " +
            object +
            " e deu outra " +
            number2 +
            "a um amigo , e no final " +
            name +
            " ainda tinha " +
            number3 +
            " " +
            object +
            ". Quantos/as " +
            object +
            " " +
            name +
            " tinha no início?";
        else
          sentence +=
            name +
            add[Math.floor(Math.random() * add.length)] +
            number1 +
            " " +
            object +
            " mas " +
            subtract[Math.floor(Math.random() * subtract.length)] +
            number2 +
            ". Então " +
            name +
            " ainda" +
            add[Math.floor(Math.random() * add.length)] +
            number3 +
            " mais " +
            object +
            ". Quantos/as " +
            object +
            " tem " +
            name +
            " ?";
      }

      if (size == 2) {
        if (Math.random() > 0.66)
          sentence +=
            name +
            add[Math.floor(Math.random() * add.length)] +
            number1 +
            " " +
            object +
            " e um amigo" +
            add[Math.floor(Math.random() * add.length)] +
            "outros " +
            number2 +
            ". Quantos/as " +
            object +
            " têm eles juntos?";
        else if (number1 > number2)
          sentence +=
            name +
            add[Math.floor(Math.random() * add.length)] +
            number1 +
            " " +
            object +
            " mas alguém roubou " +
            number2 +
            " a " +
            name +
            ". Quantos/as " +
            object +
            " tem " +
            name +
            " ?";
        else {
          number1 = (Math.floor(Math.random() * 9) + 1).toFixed(0);
          sentence +=
            name +
            " tem " +
            number1 +
            " amigos, e cada um" +
            add[Math.floor(Math.random() * add.length)] +
            number2 +
            " " +
            object +
            ". Quantos/as " +
            object +
            " têm eles?";
        }
      }
      if (size == 4) {
        if (Math.random() > 0.66) {
          number1 = (Math.floor(Math.random() * 9) + 1).toFixed(0);
          number3 = (Math.floor(Math.random() * 9) + 1).toFixed(0);
          sentence +=
            "Em uma escola existem " +
            number1 +
            " aulas com " +
            number2 +
            " alunos e " +
            number3 +
            " aulas com " +
            number4 +
            " alunos. Quantos alunos estão na escola?";
        } else if (number1 > number2) {
          number3 = (Math.floor(Math.random() * 9) + 1).toFixed(0);
          number4 = (Math.floor(Math.random() * 9) + 1).toFixed(0);
          sentence +=
            "O/a " +
            name +
            " convidou " +
            number1 +
            " amigos para uma festa. " +
            number2 +
            " desses amigos" +
            add[Math.floor(Math.random() * add.length)] +
            number3 +
            " " +
            object +
            " e os restantes " +
            number4 +
            " cada um. Quantos/as " +
            object +
            " têm os amigos de " +
            name +
            "juntos?";
        } else {
          number1 = (Math.floor(Math.random() * 9) + 1).toFixed(0);
          number3 = (Math.floor(Math.random() * 9) + 1).toFixed(0);
          sentence +=
            name +
            " tem " +
            number1 +
            " caixas com " +
            number2 +
            " " +
            object +
            " e " +
            number3 +
            " com " +
            number4 +
            " " +
            object +
            ". Quantos/as " +
            object +
            " tem " +
            name +
            " ?";
        }
      }
      if (size > 4) {
        for (j = 0; j < size; j++) {
          index = Math.floor(Math.random() * names.length);
          name = names[index];

          if (tens == 1)
            number1 = (Math.floor(Math.random() * 99) + 1).toFixed(0);
          else number1 = (Math.floor(Math.random() * 9) + 1).toFixed(0);

          if (Math.random() > 0.5)
            sentence += name + " tem " + number1 + " " + object + ". ";
          else
            sentence +=
              name +
              subtract[Math.floor(Math.random() * subtract.length)] +
              number1 +
              " " +
              object +
              ". ";

          names.splice(index, 1);
        }
        sentence += "Quantos/as " + object + " eles tinham no início?";
      }
      sequenceArray = sentence.split(/(?<=[?])/)
    }

  } else {
    for (j = 0; j < 9; j++) {
      sequence = [];
      for (i = 0; i < size; i++) {
        var number;

        if (operations[index] != " * ") {
          if (tens == 1)
            number = (Math.floor(Math.random() * 99) + 1).toFixed(0);
          else number = (Math.floor(Math.random() * 9) + 1).toFixed(0);
        } else number = (Math.floor(Math.random() * 9) + 1).toFixed(0);

        sequence.push(number);

        if (i < size - 1) {
          if (operations[index] == " * ")
            index = Math.floor(Math.random() * (operations.length - 3)).toFixed(
              0
            );
          else index = Math.floor(Math.random() * operations.length).toFixed(0);
          sequence.push(operations[index]);
        }
      }
      sequenceArray.push(sequence)
    }
  }
  return {instructions, sequenceArray, explicit}
}

function problemModel(size, tens, explicit) {
  // Ex. Funct.
  var exfunctions = (7.23).toFixed(1);

  // Attention
  var attention = (6.97).toFixed(1);

  // Memory
  var memory = (6.1).toFixed(1);

  // Language
  var language = (4.65 + explicit * 1.1).toFixed(1);

  // Difficulty
  var difficulty = (4.87 + size * 0.542 + tens * 0.365).toFixed(1);

  return {attention, memory, exfunctions, language, difficulty};
}

module.exports = {
    problemModel,
    problemTask
}