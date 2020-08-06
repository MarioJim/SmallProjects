import 'package:flutter/material.dart';

import 'dummy_data.dart';
import 'models/filters.dart';
import 'models/meal.dart';
import 'views/categories_view.dart';
import 'views/category_meals_view.dart';
import 'views/filters_view.dart';
import 'views/meal_detail_view.dart';
import 'views/tabs_view.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  Filters _filters = Filters();

  List<Meal> _availableMeals = DUMMY_MEALS;

  void _setFilters(Filters filters) {
    setState(() {
      _filters = filters;
      _availableMeals = DUMMY_MEALS.where((meal) {
        if (_filters.glutenFree && !meal.isGlutenFree) return false;
        if (_filters.lactoseFree && !meal.isLactoseFree) return false;
        if (_filters.vegan && !meal.isVegan) return false;
        if (_filters.vegetarian && !meal.isVegetarian) return false;
        return true;
      }).toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Meals App',
      theme: ThemeData(
        primarySwatch: Colors.pink,
        accentColor: Colors.amber,
        canvasColor: Color.fromRGBO(255, 254, 229, 1),
        fontFamily: 'Raleway',
        textTheme: ThemeData.light().textTheme.copyWith(
              bodyText2: TextStyle(
                color: Color.fromRGBO(20, 51, 51, 1),
              ),
              bodyText1: TextStyle(
                color: Color.fromRGBO(20, 51, 51, 1),
              ),
              headline6: TextStyle(
                fontSize: 24,
                fontFamily: 'RobotoCondensed',
                fontWeight: FontWeight.w500,
              ),
            ),
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      initialRoute: TabsView.route,
      routes: {
        CategoriesView.route: (ctx) => CategoriesView(),
        CategoryMealsView.route: (ctx) => CategoryMealsView(_availableMeals),
        MealDetailView.route: (ctx) => MealDetailView(),
        TabsView.route: (ctx) => TabsView(),
        FiltersView.route: (ctx) => FiltersView(_filters, _setFilters),
      },
      onUnknownRoute: (settings) => MaterialPageRoute(
        builder: (ctx) => CategoriesView(),
      ),
    );
  }
}
