import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'views/cart_view.dart';
import 'views/orders_view.dart';
import 'views/products_overview_view.dart';
import 'views/product_screen_view.dart';
import 'providers/cart.dart';
import 'providers/orders.dart';
import 'providers/products_provider.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (ctx) => Cart()),
        ChangeNotifierProvider(create: (ctx) => Orders()),
        ChangeNotifierProvider(create: (ctx) => ProductsProvider()),
      ],
      child: MaterialApp(
        title: 'My Shop',
        theme: ThemeData(
          primarySwatch: Colors.purple,
          accentColor: Colors.deepOrange,
          fontFamily: 'Lato',
          visualDensity: VisualDensity.adaptivePlatformDensity,
        ),
        home: ProductsOverviewView(),
        routes: {
          CartView.routeName: (ctx) => CartView(),
          OrdersView.routeName: (ctx) => OrdersView(),
          ProductScreenView.routeName: (ctx) => ProductScreenView(),
        },
      ),
    );
  }
}
