import 'package:flutter/material.dart';

import './categories_view.dart';
import './favorites_view.dart';
import '../widgets/main_drawer.dart';

class TabsView extends StatefulWidget {
  static const route = '/';

  @override
  _TabsViewState createState() => _TabsViewState();
}

class _TabsViewState extends State<TabsView> {
  List<Widget> _pages = [
    CategoriesView(),
    FavoritesView(),
  ];

  List<String> _pageTitles = [
    'Categories',
    'Your favorites',
  ];

  int _selectedPage = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_pageTitles[_selectedPage]),
      ),
      drawer: MainDrawer(),
      body: _pages[_selectedPage],
      bottomNavigationBar: BottomNavigationBar(
        onTap: (value) {
          setState(() {
            _selectedPage = value;
          });
        },
        currentIndex: _selectedPage,
        backgroundColor: Theme.of(context).primaryColor,
        unselectedItemColor: Colors.white,
        selectedItemColor: Theme.of(context).accentColor,
        type: BottomNavigationBarType.shifting,
        items: [
          BottomNavigationBarItem(
            backgroundColor: Theme.of(context).primaryColor,
            icon: Icon(Icons.category),
            title: Text('Categories'),
          ),
          BottomNavigationBarItem(
            backgroundColor: Theme.of(context).primaryColor,
            icon: Icon(Icons.star),
            title: Text('Favorites'),
          ),
        ],
      ),
    );
  }
}
