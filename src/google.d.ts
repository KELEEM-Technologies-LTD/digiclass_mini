declare namespace google {
  namespace accounts {
    namespace id {
      interface InitializeOptions {
        client_id: string;
        callback: (response: any) => void;
      }

      interface RenderButtonOptions {
        theme: string;
        size: string;
      }

      function initialize(options: InitializeOptions): void;
      function renderButton(
        element: HTMLElement | null,
        options: RenderButtonOptions
      ): void;
    }
  }
}
