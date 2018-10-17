import React, { Component } from 'react';
import ReactNative from 'react-native-macos';
import { connect } from 'react-redux';
const { View, Text, StyleSheet, TouchableOpacity, ScrollView, ListView, Linking } = ReactNative;

import ButtonGroup from '../../components/ButtonGroup';

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
            onPress={() => Linking.openURL(rowData.link)}
          >
            <Text style={{ color: "#0074FD" }}>{rowData.name}</Text>
          </TouchableOpacity>
          <View style={{ minHeight: 12 }}>
            <Text style={{ lineHeight: 12, fontSize: 12, color: "#616161" }}>
              <Text>{rowData.des}</Text>
            </Text>
          </View>
          {rowData.tag && rowData.tag.length > 0 && (
            <View style={styles.tags}>
              {rowData.tag.map((item, idx) => {
                if (item.url) {
                  return (
                    <TouchableOpacity
                      key={idx}
                      style={styles.tagItem}
                      onPress={() => Linking.openURL(item.url)}
                    >
                      <Text style={styles.tagLinkTxt}>{item.alt}</Text>
                    </TouchableOpacity>
                  );
                }
                return (
                  <View key={idx} style={styles.tagItem}>
                    <Text style={styles.tagTxt}>{item.alt}</Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </View>
    )
  }
  renderHeader() {
    const { details } = this.props;
    if (!details) return null;
    return (
      <View style={styles.details}>
        <Text style={styles.detailTxt}>{details}</Text>
      </View>
    );
  }
  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    let dataSource = ds.cloneWithRows(this.props.contentSource);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ color: '#333' }}>{this.props.title}</Text>
          <ButtonGroup
            dataSource={[
              {
                openURL: 'https://jaywcjlove.github.io/awesome-mac/',
                source: { uri: 'data:image/png;base64,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' },
              }, {
                openURL: 'https://github.com/jaywcjlove/awesome-mac',
                source: { uri: 'data:image/png;base64,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' },
              },
            ]}
          />
        </View>
        <ListView
          renderHeader={this.renderHeader.bind(this)}
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
  },
  header: {
    height: 32,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F7F5',
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
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: '#E2DEDE',
    borderBottomWidth: 1,
    borderBottomColor: '#E2DEDE',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  detailTxt: {
    color: "#8A8D96",
  },
  tags: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  tagItem: {
    backgroundColor: '#EDEDED',
    paddingHorizontal: 4,
    marginRight: 3,
    borderRadius: 3,
  },
  tagLinkTxt: {
    fontSize: 12,
    color: "#8A8D96",
  },
  tagTxt: {
    fontSize: 12,
    color: "#8A8D96",
  }
});

const mapState = ({ global }) => ({
  contentSource: global.contentSource,
  menuSource: global.menuSource,
  details: global.details,
  title: global.title,
});

const mapDispatch = ({ global }) => ({
  updateListSource: global.updateListSource
});

export default connect(mapState, mapDispatch)(Home);