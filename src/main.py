import osmnx as ox
import matplotlib.pyplot as plt

ox.config(use_cache=True, log_console=True)

G = ox.graph_from_point((40.4444, -79.960835), dist=6000, network_type='walk')
nodes, edges = ox.graph_to_gdfs(G, nodes=True)

nodes.to_csv("data/nodes.csv")
edges.to_csv("data/edges.csv")