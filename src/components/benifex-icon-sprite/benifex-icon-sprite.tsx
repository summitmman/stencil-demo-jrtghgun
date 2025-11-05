import {
  Component,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  h
} from "@stencil/core";
import sprite from "./sprite.svg";

@Component({
  tag: "benifex-icon-sprite",
  shadow: false,
})
export class BenifexIconSprite {
  render() {
    return <inline-svg style={{display: 'none'}} svg={sprite} />;
  }
}