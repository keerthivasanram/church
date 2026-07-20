from rembg import remove
from PIL import Image

input_path = r"d:\user1\Desktop\church\src\prophet-daniel-bennet-original.jpg"
output_path = r"d:\user1\Desktop\church\src\assets\images\site\prophet-daniel-bennet.png"

input_image = Image.open(input_path)
output_image = remove(input_image)
output_image.save(output_path)
print("Background removed successfully")
