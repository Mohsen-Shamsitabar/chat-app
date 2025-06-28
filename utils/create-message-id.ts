import { nanoid } from "nanoid";
import type { MessageId } from "../types/data.ts";

const createMessageId = (): MessageId => `M_${nanoid()}`;

export default createMessageId;
