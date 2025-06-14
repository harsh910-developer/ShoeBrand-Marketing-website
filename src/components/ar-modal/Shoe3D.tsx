
function Shoe3D({ color = "#8B4513" }: { color?: string }) {
  return (
    <group position={[0, -0.5, 0]} rotation={[0, Math.PI / 4, 0]}>
      {/* Shoe sole */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[2.5, 0.3, 1]} />
        <meshStandardMaterial color="#2F2F2F" />
      </mesh>
      
      {/* Shoe upper */}
      <mesh position={[0.2, 0.4, 0]}>
        <boxGeometry args={[2.2, 1.2, 0.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Shoe tongue */}
      <mesh position={[-0.8, 0.3, 0]}>
        <boxGeometry args={[0.6, 0.8, 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Laces */}
      <mesh position={[-0.8, 0.6, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.9]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
}

export default Shoe3D;
