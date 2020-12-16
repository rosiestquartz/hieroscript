import React, { Component } from 'react';
import {Header} from './Header';
import Editor from './Editor';
import Browser from './Browser';
import Console from './Console';
import './App.scss';


const PlaygroundHeader = ({ title, runCode }) => (
  
  <div className="playground-header">
    <div className="columns">
      <div className="column">
        <h2 className="title is-6">{title}</h2>
      </div>
      <div className="column has-text-right">
        <button onClick={runCode}>Run</button>
      </div>
    </div>
  </div>
);

export default class Playground extends Component {
  
  state = {
    history: [],
    title: '',
    js: '//This is where the original JavaScript code you create will be shown. You do not type here.',
    isProcessing: false // tiny way to stop a user from hitting run 10000 times in a row
  };

  // some helpers to make setting code state easier later
  setTitle = title => this.setState({ title });
  setHistory = history => this.setState({ history });
  setJs = js => this.setState({ js });

  addHistory = text => {
    const newHistory = [...this.state.history, { text }];
    this.setHistory(newHistory);
  };

  clearHistory = () => this.setHistory([]);

  /**
   * Since browser only runs when editor contents/value change, we set things to blank and then reset them
   */
  runCode = () => {
    if (this.state.isProcessing) return false;
    this.setState({ isProcessing: true });

    const { js } = this.state;
    this.setJs('');

    setTimeout(() => {
      this.setJs(js);
      this.setState({ isProcessing: false });
    }, 250);
  };

  
  render() {

    function newProject(e){ // this handles the new project button in the topnav
    
      e.preventDefault();
      if (window.confirm("Are you sure you would like to start a new project?")){
        window.open("App.js"); // wss tijdelijk? opens new fresh tab for new project
      }
  }


    const { history, title, js } = this.state;
    const HieroScriptItems = [
      {
        id: 'plus', // just an example item
        name: 'plussign',
        thumb: '/images/plusicon.png'
      }
    ]
    
    return (
      
      <div className="playground">
        <Header></Header>
          <div className="topnav">
        
            <a href="" onClick={newProject}>New Project</a>
          </div><br></br>
          
          <ul className="characters">
            {HieroScriptItems.map(({id, name, thumb}) => {
              return (
                <li key={id}>
                  <div className="characters-thumb">
                    <img src={thumb} alt={`${name} Thumb`} />
                  </div>
                  <p>
                    { name }
                  </p>
                </li>
              );
            })}
          </ul>
        <PlaygroundHeader title={title} runCode={this.runCode} />

        <div className="playground-content">
          <div className="dragdrop">
            {/* This is where the visual part of hieroscript goes once we figure out how to do it */}
          </div>

        {/* loads Codemirror editor so user can see what code they're making */}
          <Editor 
          language="javascript" 
          code={js} 
          updateCode={this.setJs} 
          />  

          {/* browser displays all user created code in an iframe */}
          <Browser
            
            js={js}
            addHistory={this.addHistory}
          />

          {/* console only shows the output of history */}
          <Console history={history} clearHistory={this.clearHistory} />
        </div>
      </div>
    );
  }
}
