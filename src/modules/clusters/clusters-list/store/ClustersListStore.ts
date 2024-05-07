import { create } from "zustand";

type ClustersListStore = {
  name: string;
  namespace: string;
  labels: { key: string; value: string }[];
  setNamespace: (namespace: string) => void;
  setName: (name: string) => void;
  addLabel: (key: string, value: string) => void;
  removeLabel: (key: string) => void;
  clearLabels: () => void;
  clear: () => void;
};

const useClusterListStore = create<ClustersListStore>()((set) => ({
  name: "",
  namespace: "",
  labels: [],
  setNamespace: (namespace) => set({ namespace }),
  setName: (name) => set({ name }),
  addLabel: (key, value) =>
    set((state) => ({
      labels: [...state.labels, { key, value }],
    })),
  removeLabel: (key) =>
    set((state) => ({
      labels: state.labels.filter((label) => label.key !== key),
    })),
  clearLabels: () => set({ labels: [] }),
  clear: () => set({ name: "", namespace: "", labels: [] }),
}));
