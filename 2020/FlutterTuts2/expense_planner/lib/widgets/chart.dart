import 'package:expense_planner/models/transaction.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../models/transaction.dart';
import './chart_bar.dart';

class Chart extends StatelessWidget {
  final List<Transaction> recentTransactions;

  Chart(this.recentTransactions);

  List<Map<String, Object>> get groupedTransactionValues {
    return List.generate(7, (index) {
      final weekDay = DateTime.now().subtract(Duration(days: index));
      var totalSum = recentTransactions
          .where(
            (tx) =>
                tx.date.day == weekDay.day &&
                tx.date.month == weekDay.month &&
                tx.date.year == weekDay.year,
          )
          .fold(0.0, (sum, tx) => sum + tx.amount);
      return {
        'day': DateFormat.E().format(weekDay).substring(0, 1),
        'amount': totalSum,
      };
    }).reversed.toList();
  }

  double get weekSpending {
    return recentTransactions.fold(0.0, (sum, tx) => sum + tx.amount);
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 5,
      margin: EdgeInsets.all(20),
      child: Padding(
        padding: EdgeInsets.all(12),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: groupedTransactionValues
              .map(
                (e) => Flexible(
                  fit: FlexFit.tight,
                  child: ChartBar(
                    e['day'],
                    e['amount'],
                    weekSpending == 0.0
                        ? 0.0
                        : (e['amount'] as double) / weekSpending,
                  ),
                ),
              )
              .toList(),
        ),
      ),
    );
  }
}
