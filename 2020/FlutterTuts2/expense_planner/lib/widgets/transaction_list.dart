import 'package:flutter/material.dart';

import '../models/transaction.dart';
import './transaction_item.dart';

class TransactionList extends StatelessWidget {
  final List<Transaction> _transactions;
  final void Function(String) _deleteTx;

  TransactionList(this._transactions, this._deleteTx);

  @override
  Widget build(BuildContext context) => _transactions.isEmpty
      ? LayoutBuilder(
          builder: (ctx, constraints) => Column(
            children: <Widget>[
              Text(
                'No transactions added yet!',
                style: Theme.of(context).textTheme.subtitle1,
              ),
              const SizedBox(height: 40),
              Container(
                height: 0.6 * constraints.maxHeight,
                child: Image.asset(
                  'assets/images/waiting.png',
                  fit: BoxFit.cover,
                ),
              )
            ],
          ),
        )
      : ListView.builder(
          itemCount: _transactions.length,
          itemBuilder: (_, index) => TransactionItem(
            key: ValueKey(_transactions[index].id),
            transaction: _transactions[index],
            deleteTx: _deleteTx,
          ),
        );
}
