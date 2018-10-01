import React, { Component } from 'react';
import ReactNative from 'react-native-macos';
import { connect } from 'react-redux';
const { View, Text, StyleSheet, TouchableOpacity, ScrollView, ListView, Linking } = ReactNative;

class Home extends Component {
  static defaultProps = {
    contentSource: [],
  }
  renderRow(rowData) {
    return (
      <View style={styles.list}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ paddingBottom: 5 }}
            onPress={() => Linking.openURL(rowData.url)}
          >
            <Text style={{ color: "#0074FD" }}>{rowData.title}</Text>
          </TouchableOpacity>
          <View style={{ minHeight: 12 }}>
            <Text style={{ lineHeight: 12, fontSize: 12, color: "#616161" }}>
              <Text>{rowData.des}</Text>
            </Text>
          </View>
        </View>
      </View>
    )
  }
  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        return r1 !== r2;
      }
    });
    let dataSource = ds.cloneWithRows(this.props.listSource);

    return (
      <View style={styles.container}>
        <ListView
          dataSource={dataSource}
          enableEmptySections={true}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 38
  },
  list: {
    flex: 1,
    marginBottom: 1,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderBottomWidth: 1,
    borderBottomColor: '#E2DEDE'
  }
})


const mapState = ({ global }) => ({
  listSource: global.listSource
});

const mapDispatch = ({ }) => ({});

export default connect(mapState, mapDispatch)(Home);