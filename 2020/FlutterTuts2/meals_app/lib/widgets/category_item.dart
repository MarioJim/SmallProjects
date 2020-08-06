import 'package:flutter/material.dart';

import '../models/category.dart';
import '../views/category_meals_view.dart';

class CategoryItem extends StatelessWidget {
  final Category _category;

  const CategoryItem(this._category);

  void selectCategory(BuildContext context) {
    Navigator.of(context).pushNamed(
      CategoryMealsView.route,
      arguments: _category,
    );
  }

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => selectCategory(context),
      splashColor: Theme.of(context).primaryColor,
      borderRadius: BorderRadius.circular(15),
      child: Container(
        padding: const EdgeInsets.all(15),
        child: Text(
          _category.title,
          style: Theme.of(context).textTheme.headline6,
        ),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [_category.color.withOpacity(0.7), _category.color],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(15),
        ),
      ),
    );
  }
}
