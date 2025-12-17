export type DemoContext = {
  language?: string;
  country?: string;
  industry?: string;
  regime?: string;
};

export type DemoResult = {
  ok: boolean;
  message: string;
  debug?: Record<string, any>;
};

export async function runDemoFlow(_ctx: DemoContext): Promise<DemoResult> {
  return {
    ok: true,
    message: "Flow contract OK (stub)",
    debug: { ts: Date.now() },
  };
}
