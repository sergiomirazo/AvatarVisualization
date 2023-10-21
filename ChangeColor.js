/**
     * This is not an actual script, but an API declaration made prettier with JS syntax highlighting.
    */
    
interface Model {
    /**
      * An ordered set of unique Materials found in this model. The Materials
      * correspond to the listing of materials in the glTF, with the possible
      * addition of a default material at the end.
      */
    readonly materials: Material[];
  
    // Returns the first material to whose name matches 'name'.
    getMaterialByName(name: string): Material|null;
  }
  
  interface Material {
    name: string;
  
    // Returns the glTF index of this material.
    readonly index: number;
    readonly normalTexture: TextureInfo|null;
    readonly occlusionTexture: TextureInfo|null;
    readonly emissiveTexture: TextureInfo|null;
    readonly emissiveFactor: RGB;
    readonly pbrMetallicRoughness: PBRMetallicRoughness;
  
    setEmissiveFactor(rgb: RGB|string): void;
    setAlphaCutoff(cutoff: number): void;
    getAlphaCutoff(): number;
    setDoubleSided(doubleSided: boolean): void;
    getDoubleSided(): boolean;
    setAlphaMode(alphaMode: AlphaMode): void;
    getAlphaMode(): AlphaMode;
  }
  
  interface PBRMetallicRoughness {
    readonly baseColorFactor: RGBA;
    readonly metallicFactor: number;
    readonly roughnessFactor: number;
    readonly baseColorTexture: TextureInfo|null;
    readonly metallicRoughnessTexture: TextureInfo|null;
    
    setBaseColorFactor(rgba: RGBA|string): void;
    setMetallicFactor(value: number): void;
    setRoughnessFactor(value: number): void;
  }
  
  interface TextureInfo {
    readonly texture: Texture|null;
  
    /**
     * Sets the texture, or removes it if argument is null. Note you cannot build
     * your own Texture object, but must either use one from another TextureInfo,
     * or create one with the createTexture method.
     */
    setTexture(texture: Texture|null): void;
  }
  
  interface Texture {
    readonly name: string;
    readonly sampler: Sampler;
    readonly source: Image;
  }
  
  interface Sampler {
    readonly name: string;
    readonly minFilter: MinFilter;
    readonly magFilter: MagFilter;
    readonly wrapS: WrapMode;
    readonly wrapT: WrapMode;
  
    setMinFilter(filter: MinFilter): void;
    setMagFilter(filter: MagFilter): void;
    setWrapS(mode: WrapMode): void;
    setWrapT(mode: WrapMode): void;
    setRotation(rotation: number|null): void;
    setScale(scale: Vector2|null): void;
    setOffset(offset: Vector2|null): void;
  }
  
  interface Image {
    readonly name: string;
  
    /**
      * The type is 'external' if the image has a configured URI. Otherwise, it is
      * considered to be 'embedded'. Note: this distinction is only implied by the
      * glTF spec, and is made explicit here for convenience.
      */
    readonly type: 'embedded'|'external';
  
    // The URI of the image, if it is external.
    readonly uri?: string;
  
    // The bufferView of the image, if it is embedded.
    readonly bufferView?: number
  
    // The backing HTML element, if this is a video or canvas texture.
    readonly element?: HTMLVideoElement|HTMLCanvasElement;
  
    // The Lottie animation object, if this is a Lottie texture.
    readonly animation?: AnimationItem;
  
    /**
      * A method to create an object URL of this image at the desired
      * resolution. Especially useful for KTX2 textures which are GPU compressed,
      * and so are unreadable on the CPU without a method like this.
      */
    createThumbnail(width: number, height: number): Promise<string>;
  
    /**
     * Only applies to canvas textures. Call when the content of the canvas has
     * been updated and should be reflected in the model.
     */
    update(): void;
  }
  
  interface Vector2D {
    readonly u: number;
    readonly v: number;
  }
  
  type RGBA = [number, number, number, number];
  type RGB = [number, number, number];
  type AlphaMode = 'OPAQUE'|'MASK'|'BLEND';
  
  enum WrapMode {
    ClampToEdge = 33071,
    MirroredRepeat = 33648,
    Repeat = 10497,
  }
  
  enum MinFilter {
    Nearest = 9728,
    Linear = 9729,
    NearestMipmapNearest = 9984,
    LinearMipmapNearest = 9985,
    NearestMipmapLinear = 9986,
    LinearMipmapLinear = 9987,
  }
  
  enum MagFilter {
    Nearest = 9728,
    Linear = 9729,
  }