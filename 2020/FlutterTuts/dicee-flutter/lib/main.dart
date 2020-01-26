import 'dart:math';

import 'package:flutter/material.dart';

void main() {
  return runApp(
    MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.red,
        appBar: AppBar(
          title: Text('Dicee'),
          backgroundColor: Colors.red,
        ),
        body: DicePage(),
      ),
    ),
  );
}

class DicePage extends StatefulWidget {
  @override
  _DicePageState createState() => _DicePageState();
}

class _DicePageState extends State<DicePage> {
  var dice1 = 1 + Random().nextInt(6);
  var dice2 = 1 + Random().nextInt(6);

  void rerollDie() {
    setState(() {
      dice1 = 1 + Random().nextInt(6);
      dice2 = 1 + Random().nextInt(6);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Row(
        children: <Widget>[
          Expanded(
            child: FlatButton(
              child: Image.asset('images/dice$dice1.png'),
              onPressed: rerollDie,
            ),
          ),
          Expanded(
            child: FlatButton(
              child: Image.asset('images/dice$dice2.png'),
              onPressed: rerollDie,
            ),
          ),
        ],
      ),
    );
  }
}
