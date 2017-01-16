import {Story} from "./story.model";

export class StoryService {

    constructor(
        private $http: angular.IHttpService
    ) {}

    get(): angular.IPromise<Story[]>;
    get(id: number): angular.IPromise<Story>;
    get(arg?): any {
        const id = arg || "";
        return this.$http.get(`/stories/${id}`).then((response: { data: Story[] | Story }) => {
            if (!response || !response.data) {
                if (arg) { return void 0; }
                return [];
            }
            const storyArr = response.data as Story[];
            if (storyArr.length) {
                return storyArr.map(story => new Story(story));
            }
            return new Story(response.data as Story);
        });
    }

    post(story: Story): angular.IHttpPromise<{}> {
        return this.$http.post("/stories", story.getWriteableStory());
    }
}
