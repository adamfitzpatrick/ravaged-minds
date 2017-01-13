export type EntityFeaturePair = [string, string];

export class Entity {

    static WRITEABLE_FIELDS = [ "playerVisible" ];

    id: number;
    uniqueName;
    name: string;
    imageUrl: string;
    size: string;
    type: string;
    subType: string;
    armorClass: number;
    hitPoints: string;
    aligment: string;
    speed: number;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    damageResistance: string[];
    senses: string[];
    languages: string[];
    challenge: number;
    features: EntityFeaturePair[];
    actions: EntityFeaturePair[];
    playerVisible: boolean;

    constructor(entity: Entity) {
        this.id = entity.id;
        this.uniqueName = entity.uniqueName;
        this.name = entity.name;
        this.size = entity.size;
        this.type = entity.type;
        this.subType = entity.subType;
        this.imageUrl = entity.imageUrl;
        this.armorClass = entity.armorClass;
        this.hitPoints = entity.hitPoints;
        this.aligment = entity.aligment;
        this.speed = entity.speed;
        this.strength = entity.strength;
        this.dexterity = entity.dexterity;
        this.constitution = entity.constitution;
        this.intelligence = entity.intelligence;
        this.wisdom = entity.wisdom;
        this.charisma = entity.charisma;
        this.damageResistance = entity.damageResistance;
        this.senses = entity.senses;
        this.languages = entity.languages;
        this.challenge = entity.challenge;
        this.features = entity.features;
        this.actions = entity.actions;
        this.playerVisible = entity.playerVisible;
    }

    get fixedHitPoints(): number { return parseInt(this.hitPoints, 10); }

    getDescriptor(): string {
        return `${this.capitalize(this.size)} ${this.type} (${this.subType}), ${this.aligment}`;
    }

    getWriteableEntity(): Entity {
        const writeable = { id: this.id };
        Entity.WRITEABLE_FIELDS.forEach(field => writeable[field] = this[field]);
        return writeable as Entity;
    }

    private capitalize(str: string) {
        return `${str[0].toUpperCase()}${str.slice(1)}`;
    }
}
