import 'package:flutter/material.dart';
import 'package:meals_app/models/filters.dart';

import '../widgets/main_drawer.dart';

class FiltersView extends StatefulWidget {
  static const route = '/filters';
  final Filters filters;
  final Function setFilters;

  FiltersView(this.filters, this.setFilters);

  @override
  _FiltersViewState createState() => _FiltersViewState();
}

class _FiltersViewState extends State<FiltersView> {
  Filters _filters = Filters();

  @override
  initState() {
    super.initState();
    _filters.glutenFree = widget.filters.glutenFree;
    _filters.vegan = widget.filters.vegan;
    _filters.vegetarian = widget.filters.vegetarian;
    _filters.lactoseFree = widget.filters.lactoseFree;
  }

  Widget _buildSwitchListTile(
    String title,
    String description,
    bool currentValue,
    Function updateValue,
  ) {
    return SwitchListTile(
      value: currentValue,
      onChanged: updateValue,
      title: Text(title),
      subtitle: Text(description),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Filters'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.save),
            onPressed: () {
              widget.setFilters(_filters);
            },
          )
        ],
      ),
      drawer: MainDrawer(),
      body: Column(
        children: <Widget>[
          Container(
            padding: const EdgeInsets.all(20),
            child: Text(
              'Adjust your meal selection',
              style: Theme.of(context).textTheme.headline6,
            ),
          ),
          Expanded(
            child: ListView(
              children: <Widget>[
                _buildSwitchListTile(
                  'Gluten-free',
                  'Only include gluten-free meals.',
                  _filters.glutenFree,
                  (val) => setState(() => _filters.glutenFree = val),
                ),
                _buildSwitchListTile(
                  'Vegetarian',
                  'Only include vegetarian meals.',
                  _filters.vegetarian,
                  (val) => setState(() => _filters.vegetarian = val),
                ),
                _buildSwitchListTile(
                  'Vegan',
                  'Only include vegan meals.',
                  _filters.vegan,
                  (val) => setState(() => _filters.vegan = val),
                ),
                _buildSwitchListTile(
                  'Lactose-free',
                  'Only include lactose-free meals.',
                  _filters.lactoseFree,
                  (val) => setState(() => _filters.lactoseFree = val),
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}
