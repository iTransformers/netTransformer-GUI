import React, {Component} from 'react';
import logo from './logo.png';
import './App.css';
import ConnectionDetailsBox from './ConnectionDetailsBox';
import DiscoveryGraphBox from './DiscoveryGraphBox';
import VersionDialog from './VersionDialog';
import ConnectionDetailsClient from './ConnectionDetailsClient';
import DiffDialog from './DiffDialog'
import DiffClient from './DiffClient'
import ResourceManagerBox from './ResourceManagerBox';
import ResourceManagerClient from './ResourceManagerClient';
import NetDiscovererBox from './NetDiscovererBox';
import NetDiscovererClient from './NetDiscovererClient';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back'
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const lightMuiTheme = getMuiTheme(lightBaseTheme);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleRequestClose = () => {
        this.setState({
            open: false,
            value: this.state.value
        });
    };

    handleClose = () => this.setState({open: false});

    handleConnDetailsSelected = () => this.setState({
        open: false,
        component: 'ConnectionDetailsBox'
    });

    handleResourcesSelected = () => this.setState({
        open: false,
        component: 'ResourceManagerBox'
    });

    handleDiscoverySelected = () => this.setState({
        open: false,
        component: 'NetDiscovererBox'
    });

    handleShowGraphSelected = () => {
        this.setState({
            open: false,
            component: 'DiscoveryGraphBox'
        });
    }
    handleOpenGraphSelected = () => {
        this.setState({
            open: false,
            component: 'VersionDialog'
        });

        this.refs.versionDialog.handleOpen();
    }
    handleCloseGraphSelected = () => {
        this.setState({
            open: false,
            component: 'DiscoveryGraphBox'
        });

       this.refs.discoveryGraphBox.handleCloseGraph();
    }


    handleDiffGraphSelected = () => {
        this.setState({
            open: false,
            component: 'VersionDialog'
        });

        this.refs.diffDialog.handleOpen();
    }

    handleVersion(version){
        this.refs.discoveryGraphBox.handleOpenGraph(version);
        this.handleShowGraphSelected();
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={lightMuiTheme}>
                <div className="App">
                    <AppBar
                        title={<span><img src={logo} className="App-logo" alt="logo" /></span>}
                        onTouchTap={this.handleToggle}
                        iconElementLeft={<IconButton><MenuIcon /></IconButton>}
                    />
                    <Drawer
                        docked={false}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}
                    >
                        <MenuItem onTouchTap={this.handleClose}><IconButton><ArrowBackIcon /></IconButton></MenuItem>
                        <MenuItem onTouchTap={this.handleConnDetailsSelected}>Connections</MenuItem>
                        <MenuItem onTouchTap={this.handleResourcesSelected}>Resources</MenuItem>
                        <MenuItem onTouchTap={this.handleDiscoverySelected}>Discover</MenuItem>
                        <MenuItem onTouchTap={this.handleOpenGraphSelected.bind(this)}>Open</MenuItem>
                        <MenuItem onTouchTap={this.handleCloseGraphSelected.bind(this)}>Close</MenuItem>
                        <MenuItem onTouchTap={this.handleShowGraphSelected.bind(this)}>Show</MenuItem>
                        <MenuItem onTouchTap={this.handleDiffGraphSelected.bind(this)}>Diff</MenuItem>

                    </Drawer>
                    <ConnectionDetailsBox style={ {display:  (this.state.component === 'ConnectionDetailsBox' ? "block" : "none" ) }} client={ConnectionDetailsClient} pollInterval={2000}/>
                    <ResourceManagerBox style={ { display:  (this.state.component === 'ResourceManagerBox' ? "block" : "none")}} client={ResourceManagerClient} pollInterval={2000}/>
                    <NetDiscovererBox style={ { display:  (this.state.component === 'NetDiscovererBox' ? "block" : "none")}} client={NetDiscovererClient} pollInterval={2000}/>
                    <DiscoveryGraphBox ref="discoveryGraphBox" style={ {display:  (this.state.component === 'DiscoveryGraphBox' ? "block" : "none")}} />
                    <VersionDialog handleOpenVersion={this.handleVersion.bind(this)} style={ {display:  (this.state.component === 'DiscoveryGraphBox' ? "block" : "none")}} ref="versionDialog"/>
                    <ResourceManagerBox style={ { display:  (this.state.component === 'ResourceManagerBox' ? "block" : "none")}} client={ResourceManagerClient} pollInterval={2000}/>
                    <DiffDialog handleDiffVersion={this.handleVersion.bind(this)} style={ {display:  (this.state.component === 'DiscoveryGraphBox' ? "block" : "none")}} ref="diffDialog" client={DiffClient}/>

                </div>
            </MuiThemeProvider>
        )
    }
}

export default App;
