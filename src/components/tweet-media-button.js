import configs from "../utils/configs";

AFRAME.registerComponent("tweet-media-button", {
  init() {
    NAF.utils.getNetworkedEntity(this.el).then(networkedEl => {
      this.targetEl = networkedEl;
    });

    this.onClick = () => {
      const hasDiscordBridges = window.APP.hubChannel && window.APP.hubChannel.discordBridges().length > 0;

      const text = !hasDiscordBridges
        ? `Taken in ${location.hostname} - ` +
          `join me now at ${configs.SHORTLINK_DOMAIN}/${window.APP.hubChannel.hubId}! `
        : `Taken in ${location.hostname} `;

      const { src, contentSubtype } = this.targetEl.components["media-loader"].data;
      this.el.sceneEl.emit("action_media_tweet", { url: src, contentSubtype, text, el: this.targetEl });
    };
  },

  play() {
    if (!configs.AVAILABLE_INTEGRATIONS.twitter) {
      this.el.object3D.visible = false;
      return;
    }
    this.el.object3D.addEventListener("interact", this.onClick);
  },

  pause() {
    this.el.object3D.removeEventListener("interact", this.onClick);
  }
});
