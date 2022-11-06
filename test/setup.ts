import { config } from "@vue/test-utils";
import { Quasar } from "quasar";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { vi } from "vitest";

config.global.plugins.push([Quasar, {}]);

const pinia = createTestingPinia({
  createSpy: vi.fn(),
});
setActivePinia(pinia);
config.global.plugins.push([pinia, {}]);
