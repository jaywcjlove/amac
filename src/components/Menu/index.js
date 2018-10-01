import React, { Component } from 'react';
import ReactNative from 'react-native-macos';
const { View, Text, StyleSheet, TouchableOpacity, ScrollView } = ReactNative;

class ListView extends React.Component {
  render() {
    var componentRow = []
    for (var a in this.props.dataSource) {
      componentRow.push(this.props.renderRow(a, this.props.dataSource[a]))
    }
    return (
      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={{ paddingTop: 10 }}>
          {componentRow}
        </View>
      </ScrollView>
    );
  }
}

export default class Menu extends Component {
  static defaultProps = {
    dataSource: [],
    onPress: new Function
  }
  constructor(props) {
    super(props)
    this.state = {
      dataSource: this.props.dataSource,
      onPress: this.props.onPress,
      selector: this.props.selector || "",
    }
  }
  render() {
    return (
      <View style={styles.listContainer}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    )
  }
  componentDidMount() {
    this.setState({ dataSource: this.state.dataSource })
  }
  renderRow(key, data) {
    return (
      <TouchableOpacity key={key} onPress={(e) => {
        this.setState({ selector: key });
        this.state.onPress && this.state.onPress(e, key);
      }}>
        <View style={key == this.state.selector ? styles.active : styles.cancel}>
          <Text style={[styles.menuTitle,]} numberOfLines={1}>{key == this.state.selector}{data.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

var styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingTop: 20
  },
  active: {
    backgroundColor: "rgba(255, 255, 255, 0.11)"
  },
  cancel: {
    backgroundColor: "transparent"
  },
  menuTitle: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    lineHeight: 16,
    fontWeight: "100",
    fontFamily: "PingFang TC"
  }
})