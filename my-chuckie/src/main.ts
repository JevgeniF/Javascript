import Aurelia, { ColorOptions, ConsoleSink, LoggerConfiguration, LogLevel, RouterConfiguration } from 'aurelia';
import { MyApp } from './my-app';
import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'font-awesome/css/font-awesome.min.css';
Aurelia
    .register(
        LoggerConfiguration.create(
            {
                sinks: [ConsoleSink],
                level: LogLevel.debug,
                colorOptions:
                ColorOptions.colors
            }
        ),
        RouterConfiguration.customize({ useUrlFragmentHash: false }))
    .app(MyApp)
    .start();
