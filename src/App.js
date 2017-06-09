import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import { Table, Input, Grid, Header, Icon } from 'semantic-ui-react'
import isValidExpAddress from './helpers/addressValidator';
import './Footer.css';
import sweetAlert from 'sweetalert';
import 'sweetalert/dist/sweetalert.css';

const ENODE_IP = "52.179.18.34";
const ENODE_PORT = "8545";
const web3 = new Web3(new Web3.providers.HttpProvider(`http://${ENODE_IP}:${ENODE_PORT}`));

const abi = [{ "constant": false, "inputs": [{ "name": "_bondid", "type": "uint256" }], "name": "redeemBond", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_limit", "type": "uint256" }], "name": "increaseLimit", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "maturity", "outputs": [{ "name": "", "type": "uint256", "value": "15768000" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "withdraw", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "nUBP", "outputs": [{ "name": "", "type": "uint256", "value": "154" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_bondid", "type": "uint256" }, { "name": "_index", "type": "uint256" }], "name": "getBondHistory", "outputs": [{ "name": "block", "type": "uint256", "value": "0" }, { "name": "amount", "type": "uint256", "value": "0" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_bondid", "type": "uint256" }], "name": "redeemCoupon", "outputs": [{ "name": "", "type": "bool" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_nSteps", "type": "uint256" }], "name": "upgradeBonds", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "coupon", "outputs": [{ "name": "", "type": "uint256", "value": "1000000000000000000" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "bonds", "outputs": [{ "name": "active", "type": "bool", "value": false }, { "name": "owner", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "multiplier", "type": "uint256", "value": "0" }, { "name": "maturityTime", "type": "uint256", "value": "0" }, { "name": "lastRedemption", "type": "uint256", "value": "0" }, { "name": "nextRedemption", "type": "uint256", "value": "0" }, { "name": "created", "type": "uint256", "value": "0" }, { "name": "couponsRemaining", "type": "uint256", "value": "0" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_bondid", "type": "uint256" }], "name": "getBondHistoryLength", "outputs": [{ "name": "", "type": "uint256", "value": "0" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_addr", "type": "address" }], "name": "getUser", "outputs": [{ "name": "exists", "type": "bool", "value": false }, { "name": "balance", "type": "uint256", "value": "0" }, { "name": "bonds", "type": "uint256[]", "value": [] }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address", "value": "0xcf751ced133c8e56cc686b7ebd5d9b26369b950c" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "limitBonds", "outputs": [{ "name": "", "type": "uint256", "value": "8350" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "price", "outputs": [{ "name": "", "type": "uint256", "value": "100000000000000000000" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_newOwner", "type": "address" }], "name": "changeOwner", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "users", "outputs": [{ "name": "exists", "type": "bool", "value": false }, { "name": "balance", "type": "uint256", "value": "0" }, { "name": "upgraded", "type": "bool", "value": false }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_bondid", "type": "uint256" }, { "name": "_to", "type": "address" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "nBonds", "outputs": [{ "name": "", "type": "uint256", "value": "154" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "maxCoupons", "outputs": [{ "name": "", "type": "uint256", "value": "6" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "deposit", "outputs": [], "payable": true, "type": "function" }, { "constant": true, "inputs": [{ "name": "_bondid", "type": "uint256" }], "name": "getBond", "outputs": [{ "name": "active", "type": "bool", "value": false }, { "name": "owner", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "multiplier", "type": "uint256", "value": "0" }, { "name": "maturityTime", "type": "uint256", "value": "0" }, { "name": "lastRedemption", "type": "uint256", "value": "0" }, { "name": "nextRedemption", "type": "uint256", "value": "0" }, { "name": "created", "type": "uint256", "value": "0" }, { "name": "couponsRemaining", "type": "uint256", "value": "0" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_multiplier", "type": "uint256" }], "name": "buy", "outputs": [{ "name": "bondId", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "activeBonds", "outputs": [{ "name": "", "type": "uint256", "value": "8322" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "period", "outputs": [{ "name": "", "type": "uint256", "value": "2628000" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalBonds", "outputs": [{ "name": "", "type": "uint256", "value": "8322" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "empty", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_user", "type": "address" }], "name": "getBalance", "outputs": [{ "name": "", "type": "uint256", "value": "0" }], "payable": false, "type": "function" }, { "inputs": [], "payable": true, "type": "constructor" }, { "payable": true, "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "User", "type": "address" }, { "indexed": true, "name": "BondId", "type": "uint256" }, { "indexed": false, "name": "Multiplier", "type": "uint256" }, { "indexed": false, "name": "MaturityTime", "type": "uint256" }], "name": "Buys", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "Sender", "type": "address" }, { "indexed": false, "name": "Amount", "type": "uint256" }], "name": "Deposits", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "User", "type": "address" }, { "indexed": true, "name": "BondId", "type": "uint256" }, { "indexed": false, "name": "Coupons", "type": "uint256" }, { "indexed": false, "name": "Amount", "type": "uint256" }], "name": "RedeemCoupons", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "User", "type": "address" }, { "indexed": true, "name": "BondId", "type": "uint256" }, { "indexed": false, "name": "Amount", "type": "uint256" }], "name": "RedeemBonds", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "TransferFrom", "type": "address" }, { "indexed": true, "name": "TransferTo", "type": "address" }, { "indexed": true, "name": "BondId", "type": "uint256" }], "name": "Transfers", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "Amount", "type": "uint256" }, { "indexed": true, "name": "User", "type": "address" }], "name": "Withdraws", "type": "event" }]
const bondAddress = "0x6E4A860420e024d2f269d45F85a24Dc6F586376D";

const deployedBondContract = web3.eth.contract(abi).at(bondAddress);

class App extends Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      blockNumber: web3.eth.blockNumber,
      userAddress: '0x00'
    }
  }
  componentDidMount() {
    const filter = web3.eth.filter('latest');
    filter.watch((error, result) => {
      const block = web3.eth.getBlock(result, true);
      this.setState({ blockNumber: block.number });
    });
  }

  onSearch() {
    const address = this.refs.search.inputRef.value;
    if (isValidExpAddress(address.trim())) {
      console.log('onSearch', address);
      this.refs.search.inputRef.value = '';
      this.setState({ userAddress: address });
    } else {
      sweetAlert("Oops...", "This is invalid Expanse Address!", "error");
    }
  }
// 0xb7c83f5e47b0513ce58364d57aa5db7c18243133 - example address to search for
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>blockNumber: {this.state.blockNumber}</h2>
          <h3>expansebondapp.tk</h3>
        </div>

        <Input className="Search" style={{ width: '600px', marginTop: '10px' }} placeholder="Your Expanse address in hex format" ref="search" action={{ content: 'GO', onClick: this.onSearch }} />
        <Table className="Table" celled color="purple" sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Value</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>Active Bonds:</Table.Cell>
              <Table.Cell>{deployedBondContract.activeBonds().toNumber()}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>nBonds</Table.Cell>
              <Table.Cell>{deployedBondContract.nBonds().toNumber()}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Total Bonds</Table.Cell>
              <Table.Cell>{deployedBondContract.totalBonds().toNumber()}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Total Bonds</Table.Cell>
              <Table.Cell>{deployedBondContract.limitBonds().toNumber()}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>User getBalance </Table.Cell>
              <Table.Cell>{deployedBondContract.getBalance(this.state.userAddress).toNumber()}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>User Bonds array length</Table.Cell>
              <Table.Cell>{deployedBondContract.getUser(this.state.userAddress)[2].length}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <footer>
          <div className="footer-inner">
            <Grid>
                <Grid.Column>
                  <Grid.Row>
                    <a href="http://www.gander.tech/address/0x6e4a860420e024d2f269d45f85a24dc6f586376d">0x6e4a860420e024d2f269d45f85a24dc6f586376d</a>
                    </Grid.Row>
                    <Grid.Row>
                      Bond App Contract on <a href="http://www.expanse.tech/">Expanse</a>
                    </Grid.Row>
                    <Grid.Row>
                      Made by Roman Storm
                    </Grid.Row>
                    <Header as="h3" inverted>
                      <a href="https://github.com/rstormsf/expanse-bond-dapp">
                        <Icon name="github" link size="big"/>
                      </a>
                            
                    </Header>
                </Grid.Column>
            </Grid>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
