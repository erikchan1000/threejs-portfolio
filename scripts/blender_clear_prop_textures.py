"""
Run inside Blender after opening your room .blend.

Duplicates materials on Lantern / Steps (Blender names use dots: Steps.001) so they no
longer share materials with the framed pictures, then disconnects Principled Base Color
from any image links (solid neutral gray).

Re-export glTF 2.0 to public/models/IsometricRoom16.glb when done. You can then remove
the runtime strip in components/three/Room.tsx if you want.
"""
import bpy

# Blender object names (note "Mail box" with a space; GLB export may use Mail_box)
TARGET_NAMES = ('Lantern', 'Steps', 'Steps.001', 'Steps.002')


def disconnect_principled_base_color(tree: bpy.types.NodeTree) -> None:
    for node in tree.nodes:
        if node.type != 'BSDF_PRINCIPLED':
            continue
        base = node.inputs.get('Base Color')
        if not base:
            continue
        for link in list(base.links):
            tree.links.remove(link)
        base.default_value = (0.42, 0.41, 0.4, 1.0)
        return


def separate_materials_for_mesh(obj: bpy.types.Object) -> None:
    if obj.type != 'MESH':
        return
    safe = obj.name.replace('.', '_')
    for i, slot in enumerate(obj.material_slots):
        old = slot.material
        if not old:
            continue
        new_mat = old.copy()
        new_mat.name = f'{old.name}_prop_{safe}_s{i}'[:63]
        slot.material = new_mat
        if new_mat.use_nodes and new_mat.node_tree:
            disconnect_principled_base_color(new_mat.node_tree)


def main() -> None:
    for name in TARGET_NAMES:
        obj = bpy.data.objects.get(name)
        if not obj:
            print(f'Blender: missing object {name!r}')
            continue
        separate_materials_for_mesh(obj)
        print(f'Blender: separated materials on {name!r}')


if __name__ == '__main__':
    main()
