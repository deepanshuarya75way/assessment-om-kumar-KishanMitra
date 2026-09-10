import os
import logging

logger = logging.getLogger(__name__)

def download_single_model(filename, relative_dest):
    hf_repo_id = os.getenv("HF_REPO_ID")
    if not hf_repo_id:
        logger.warning(f"HF_REPO_ID not set. Cannot download {filename}")
        return None

    base_dir = os.path.dirname(os.path.abspath(__file__))
    local_path = os.path.join(base_dir, relative_dest, filename)

    if os.path.exists(local_path):
        return local_path

    try:
        from huggingface_hub import hf_hub_download
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        logger.info(f"Downloading {filename} from Hugging Face Hub...")
        downloaded_file = hf_hub_download(
            repo_id=hf_repo_id,
            filename=filename,
            local_dir=os.path.dirname(local_path)
        )
        logger.info(f"Successfully downloaded {filename}")
        return downloaded_file
    except Exception as e:
        logger.error(f"Failed to download {filename}: {e}")
        return None
