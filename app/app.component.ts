import * as angular from "angular";
import {landing} from "./landing/landing";
import {topBar} from "./top-bar/top-bar";
import {story} from "./story/story";
import {storyIntroduction} from "./story/story-content/Introduction/introduction";
import {storyNode} from "./story/story-node/story-node";
import {storyBrief} from "./story/story-brief/story-brief";

export function initComponents(app: angular.IModule) {
    app.component("topBar", topBar);
    app.component("landing", landing);
    app.component("story", story);
    app.component("storyNode", storyNode);
    app.component("storyBrief", storyBrief);
    app.component("storyIntroduction", storyIntroduction);
}
