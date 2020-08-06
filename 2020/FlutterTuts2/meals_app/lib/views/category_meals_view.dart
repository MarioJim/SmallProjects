import 'package:flutter/material.dart';
import 'package:meals_app/widgets/meal_item.dart';

import '../models/category.dart';
import '../models/meal.dart';

class CategoryMealsView extends StatefulWidget {
  static const route = '/category-meals';
  final List<Meal> availableMeals;

  CategoryMealsView(this.availableMeals);

  @override
  _CategoryMealsViewState createState() => _CategoryMealsViewState();
}

class _CategoryMealsViewState extends State<CategoryMealsView> {
  Category category;
  List<Meal> displayedMeals;
  bool loadedInitData = false;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (loadedInitData) return;
    category = ModalRoute.of(context).settings.arguments as Category;
    displayedMeals = widget.availableMeals
        .where((meal) => meal.categories.contains(category.id))
        .toList();
    loadedInitData = true;
  }

  void _removeMeal(String mealId) {
    setState(() {
      displayedMeals.removeWhere((meal) => meal.id == mealId);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(category.title),
      ),
      body: Center(
        child: ListView.builder(
          itemBuilder: (ctx, index) => MealItem(
            displayedMeals[index],
            _removeMeal,
          ),
          itemCount: displayedMeals.length,
        ),
      ),
    );
  }
}
