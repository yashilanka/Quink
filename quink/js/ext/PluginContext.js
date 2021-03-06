/**
 * Quink, Copyright (c) 2013-2014 IMD - International Institute for Management Development, Switzerland.
 *
 * This file is part of Quink.
 * 
 * Quink is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Quink is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Quink.  If not, see <http://www.gnu.org/licenses/>.
 */

define([
    'jquery'
], function ($) {
    'use strict';

    var PluginContext = function (def) {
        if (def.def) {
            this.container = def.el;
            this.definition = def.def;
        } else {
            this.container = def.container;
            this.definition = def;
        }
    };

    PluginContext.prototype.getContainer = function () {
        return this.container;
    };

    PluginContext.prototype.isEdit = function () {
        return this.getContainer() instanceof $;
    };

    PluginContext.prototype.getContainerData = function () {
        var cont = this.getContainer();
        return this.isEdit() ? cont.html() : null;
    };

    PluginContext.prototype.commit = function (data, range) {
        var cfg, el;
        if (this.isEdit()) {
            this.getContainer().html(data);
        } else {
            cfg = this.getContainer();
            el = document.createElement(cfg.element);
            el.setAttribute('class', cfg['class']);
            el.innerHTML = data;
            range.insertNode(el);
        }
    };

    PluginContext.prototype.getDefinition = function () {
        return this.definition;
    };

    var theInstance;

    function create(def) {
        if (theInstance) {
            throw new Error('Plugin context already exists');
        }
        theInstance = new PluginContext(def);
    }

    function destroy() {
        theInstance = null;
    }

    function getContainer() {
        return theInstance.getContainer();
    }

    function getData() {
        return theInstance.getContainerData();
    }

    function commit(data, range) {
        theInstance.commit(data, range);
    }

    function getDefinition() {
        return theInstance.getDefinition();
    }

    return {
        create: create,
        destroy: destroy,
        getContainer: getContainer,
        getData: getData,
        commit: commit,
        getDefinition: getDefinition
    };
});
