/**
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Switch, Route, Redirect } from 'react-router-native';
import { connect } from 'react-redux';
import Menu from '../components/Menu/';

const Props = {
  routerData: Object
}

class BasicLayout extends Component<Props> {
  componentDidMount() {
    const { contentSource, menuSource } = this.props;
    if (contentSource && contentSource.length === 0 && menuSource.data) {
      const menuKeys = Object.keys(menuSource.data);
      if (menuKeys && menuKeys[0]) {
        this.props.updateState({
          title: menuSource.data[menuKeys[0]].title,
          selector: menuKeys[0],
          details: menuSource.data[menuKeys[0]].des,
          contentSource: menuSource.data[menuKeys[0]].items,
        });
      }
    }
  }
  render() {
    const { routerData, menuSource } = this.props;
    const RouteComponents = [];
    Object.keys(routerData).forEach((path, idx) => {
      if (path === '/') {
        RouteComponents.push(<Route exact key={`index-${path}`} path="/" render={() => <Redirect to="/home" />} />);
      }
      if (/^(\/)/.test(path) && !/^(\/)$/.test(path)) {
        RouteComponents.push(<Route key={idx} path={path} component={routerData[path].component} />);
      }
    });
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <Menu
            selector={this.props.selector}
            dataSource={menuSource.data}
            onPress={(e, key) => {
              if (menuSource.data && menuSource.data.length > 0 && menuSource.data[key]) {
                this.props.updateState({
                  title: menuSource.data[key].title,
                  selector: menuSource.data[key].key,
                  details: menuSource.data[key].des,
                  contentSource: menuSource.data[key].items,
                });
              }
            }}
          /> 
        </View>
        <View style={styles.right}>
          <Switch>
            {RouteComponents}
          </Switch>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  left: {
    width: 182,
    backgroundColor: "#3B3B3B",
  },
  right: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

const mapState = ({ global }) => ({
  selector: global.selector,
  contentSource: global.contentSource,
  menuSource: global.menuSource,
});

const mapDispatch = ({ global }) => ({
  updateListSource: global.updateListSource,
  updateState: global.updateState,
});

export default connect(mapState, mapDispatch)(BasicLayout);